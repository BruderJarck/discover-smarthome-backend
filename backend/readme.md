
Angular / django training project

## disclaimer
  This is only dev setup do not deploy in this stage to prod. server.
  This guide assumes youre using git bash.

## dependencies
- python 3.7 https://www.python.org/downloads/release/python-379/
- git installed https://git-scm.com/downloads
- pip installed https://pip.pypa.io/en/stable/installing/
- content of requirements.txt
## installation 

in your terminal:

  ```
  git <clone repo url>
  ```
  
  ```
  cd <repo location>/backend
  
  ```
  create virtual environment
  ```
  python -m venv ./venv
  ```
  
  ```
  source ./venv/Scripts/activate
  ```

  install depencencies
  ```
  pip install -r requirements.txt
  ```
  
  
## usage
in your terminal:
  
  start backend server
  ```
  python manage.py runserver 5000
  ```
  
  visit 
  http://localhost:5000
  to view backend management
  
  visit
  http://localhost:5000/admin

  default-pwd: admin
  
  defaulr-user: admin


  to view adminpage to manipulate data
  
  Youre now ready to make requests to http restisendpoints visible on backend management site.
