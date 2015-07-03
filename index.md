---
title: CARS
layout: index
---

### Overview

This is an analysis of the 2010 Cash for Clunkers Program (or CARS) dataset found [here](http://www.nhtsa.gov/Laws+&+Regulations/CARS+Program+Transaction+Data+and+Reports). 

Use the buttons and the top and bottom of the pages to navigate, or use the following links.

- [Page 1 - Metrics of Success](./page-01.html)
	- Defining some metrics of success for the program and showing which states did best or worst
- [Page 2 - West Coast = Best Coast?](./page-02.html)
	- Determining if the west coast bought more fuel efficient vehicles than other US regions
- [Page 3 - Buying Behavior](./page-03.html)
	- Looking for patterns in when and how people buy vehicles
- [Page 4 - A wild success?](./page-04.html)
	- Thinking about whether the program was a success

### Technical Details

#### Tools / Languages used

- HTML / CSS / JavaScript / jQuery
- Python
- Bash Scripting
- [Underscore.js](http://underscorejs.org/)
- [Google Charts](https://developers.google.com/chart/)
- [Markdown](http://daringfireball.net/projects/markdown/)
- [GitHub Pages](https://pages.github.com/)

#### Implementation / Assumptions

- The [data set](ftp://ftp.nhtsa.dot.gov/CARS/CARS_PAID_Final.txt) provided by the NHTSA was used. 
- Other related data sets (regarding canceled transactions and such) were not considered.
- We use [this python script](https://github.com/simzou/cars-analysis/blob/gh-pages/data/csv_to_json.py) (see [usage here](https://github.com/simzou/cars-analysis/blob/gh-pages/data/convert_data_files.sh)) to strip the data set of columns unnecessary for our analysis and output it to a json file
- The utility functions provided by underscore.js are then used to manipulate the data into the format necessary for Google charts.
- Data relating to US territories was removed
- Pages may be slow to load as it has to download the data and run operations on them to display visualizations
- Pages were written in a mix of markdown and HTML syntax which is then automatically converted to html by github pages