---

Date: 2021-05-12

Topic:
-  conda
-  Jupyter Notebook
Ref:


---





* how to start 
	goodl reference [Python and Data Science Tutorial in Visual Studio Code](https://code.visualstudio.com/docs/python/data-science-tutorial)
	
	* install conda
	* launch new env
	* create notebook in vscode
	* select the env in python interpreter
	
* how to install package?
	* active the env in terminal
	* conda install packagename

* how to create new env using conda?
```

conda create -n myenv python=3.7 pandas jupyter seaborn scikit-learn keras tensorflow

```


* how to active env ?

```
conda activate myenv
```


* how to deactive env?


```
conda deactivate 
```