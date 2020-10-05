## Complete tasks 1-6 to activate live RNG data storage

##

1. Install requirements

   > pip install -r requirements.txt

2. Run RNG .txt file writer:

   > python RNGActivateMultiV3

3. Run server

   > python dev-server.py or python production-server.py

4. Run git commit/push workflow automation in terminal of local repo

   > python commit.py

5. Run git pull workflow automation in terminal of deployed app

   > python pull-changes.py

6. Run tests:
   > pytest -v --cov

##

-> Errors

1.  error: pytest -v --cov  
    pytest : The term 'pytest' is not
    recognized as the name of a cmdlet,  
    function, script file, or operable  
    program. Check the spelling of the name,  
    or if a path was included, verify that  
    the path is correct and try again.
    At line:1 char:1

- pytest -v --cov
- ```
    + CategoryInfo          : ObjectNotFo
   und: (pytest:String) [], CommandNotFo
  undException
    + FullyQualifiedErrorId : CommandNotF
   oundException
  ```

Workaround python -m pytest -v --cov
