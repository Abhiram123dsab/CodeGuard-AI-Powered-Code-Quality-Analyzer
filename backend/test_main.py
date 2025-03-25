import pytest
from fastapi.testclient import TestClient
from main import app
import tempfile
import os
import subprocess

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def sample_python_file():
    content = """def example():
    x = 1
    return x
"""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(content)
        f.flush()
    try:
        yield f.name
    finally:
        os.unlink(f.name)

@pytest.fixture
def sample_js_file():
    content = "function example() { let x = 1; return x; }"
    with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
        f.write(content)
        f.flush()
    try:
        yield f.name
    finally:
        os.unlink(f.name)

def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    assert "CodeGuard API" in response.text

def test_analyze_python(client, sample_python_file):
    with open(sample_python_file, 'rb') as f:
        response = client.post("/analyze", files={"file": f})
    
    assert response.status_code == 200
    data = response.json()
    assert 'overall_score' in data
    assert 'categories' in data
    assert 'recommendations' in data
    assert set(data['categories'].keys()) == {'code_quality', 'code_style', 'naming', 'modularity', 'comments'}
    assert 0 <= data['overall_score'] <= 100

def test_analyze_javascript(client, sample_js_file):
    with open(sample_js_file, 'rb') as f:
        response = client.post("/analyze", files={"file": f})
    
    assert response.status_code == 200
    data = response.json()
    assert 'overall_score' in data
    assert 'categories' in data
    assert set(data['categories'].keys()) == {'code_quality', 'code_style', 'security', 'modularity'}
    assert 0 <= data['overall_score'] <= 100

def test_invalid_file_type(client):
    with tempfile.NamedTemporaryFile(suffix='.txt') as f:
        response = client.post("/analyze", files={"file": f})
    
    assert response.status_code == 400
    assert "Unsupported file type" in response.text

def test_radon_failure(client, monkeypatch):
    def mock_radon_failure(*args, **kwargs):
        return subprocess.CompletedProcess(args='', returncode=1, stdout='', stderr='Radon error')
    
    monkeypatch.setattr(subprocess, 'run', mock_radon_failure)
    
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.py', delete=False) as f:
        f.write('def bad()\n    pass')
        f.flush()
        f.close()
        with open(f.name, 'rb') as file:
            response = client.post("/analyze", files={"file": file})
    
    assert response.status_code == 500
    assert "Radon analysis failed" in response.text

def test_missing_eslint(client, monkeypatch):
    def mock_eslint_not_found(*args, **kwargs):
        raise FileNotFoundError()
    
    monkeypatch.setattr(subprocess, 'run', mock_eslint_not_found)
    
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
            temp_path = f.name
            f.write('')
        
        with open(temp_path, 'rb') as file:
            response = client.post("/analyze", files={"file": file})
    finally:
        if temp_path and os.path.exists(temp_path):
            os.unlink(temp_path)
    
    assert response.status_code == 500
    assert "ESLint not installed" in response.text

def test_score_calculation(client):
    test_code = """def example():
    x = 1  # Undocumented variable
    return X"""
    
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.py', delete=False) as f:
        f.write(test_code)
        f.flush()
        f.close()
        with open(f.name, 'rb') as file:
            response = client.post("/analyze", files={"file": file})
    
    data = response.json()
    assert data['overall_score'] < 100
    assert any('naming' in rec for rec in data['recommendations'])
    assert data['categories']['comments']['score'] < 100

def test_empty_file_handling(client):
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.py', delete=False) as f:
        f.write('')
        f.flush()
        f.close()
        with open(f.name, 'rb') as file:
            response = client.post("/analyze", files={"file": file})
    
    assert response.status_code == 200
    data = response.json()
    assert data['overall_score'] < 50
    assert any('Empty file' in rec for rec in data['recommendations'])

def test_syntax_error_handling(client):
    test_code = """def example():
    return missing_variable"""
    
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.py', delete=False) as f:
        f.write(test_code)
        f.flush()
        f.close()
        with open(f.name, 'rb') as file:
            response = client.post("/analyze", files={"file": file})
    
    data = response.json()
    assert data['overall_score'] < 30
    assert any('undefined variable' in rec for rec in data['recommendations'])

def test_security_recommendations(client):
    js_code = "eval('foo='+document.cookie);"
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
            temp_path = f.name
            f.write(js_code)
            f.flush()
        
        with open(temp_path, 'rb') as file:
            response = client.post("/analyze", files={"file": file})
    finally:
        if temp_path and os.path.exists(temp_path):
            os.unlink(temp_path)
    
    data = response.json()
    assert data['categories']['security']['score'] < 50
    assert any('eval' in rec for rec in data['recommendations'])


def test_secure_js_with_style_issues(client):
    js_code = "function example() {\n    let x = 1\n    return x\n}"
    temp_path = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
            temp_path = f.name
            f.write(js_code)
            f.flush()
        
        with open(temp_path, 'rb') as file:
            response = client.post("/analyze", files={"file": file})
    finally:
        if temp_path and os.path.exists(temp_path):
            os.unlink(temp_path)
    
    data = response.json()
    assert data['categories']['security']['score'] == 100
    assert data['categories']['security']['issues'] == 0
    assert not any('security' in rec.lower() for rec in data['recommendations'])