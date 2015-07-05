---
title: CARS
layout: index
---

### Overview

This is an analysis of the 2010 Cash for Clunkers Program (or CARS) dataset found [here](http://www.nhtsa.gov/Laws+&+Regulations/CARS+Program+Transaction+Data+and+Reports). It was a 3 billion dollar US government program intended to stimulate the economy and incentivize the use of more fuel efficient vehicles by paying participants $4500 dollars to trade in an old vehicle for a more fuel efficient one. This report summarizes the results of the program and compares how the program did in various states and regions.

Use the buttons and the top and bottom of the pages to navigate, or use the following links (best viewed in latest versions of Chrome or Firefox).

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
- Git
- [Underscore.js](http://underscorejs.org/)
- [Google Charts](https://developers.google.com/chart/)
- [Markdown](http://daringfireball.net/projects/markdown/)
- [GitHub Pages](https://pages.github.com/)
- [Cayman Theme](https://github.com/jasonlong/cayman-theme) by [Jason Long](https://twitter.com/jasonlong)

#### Implementation Details / Assumptions

- Preliminary planning document for project can be found [here](https://github.com/simzou/cars-analysis/blob/gh-pages/planning.txt)
- The [data set](ftp://ftp.nhtsa.dot.gov/CARS/CARS_PAID_Final.txt) provided by the NHTSA was used. 
- Other related data sets (regarding canceled transactions and such) were not considered.
- Data relating to US territories was removed
- Pages may be slow to load as it has to download the data (~20-30 MB) and run operations on them client-side to display visualizations
- Theme uses responsive design and is mobile friendly

#### Steps
1. We use [this python script](https://github.com/simzou/cars-analysis/blob/gh-pages/data/csv_to_json.py) (see [usage here](https://github.com/simzou/cars-analysis/blob/gh-pages/data/convert_data_files.sh)) to strip the data set of columns unnecessary for our analysis and output it to json files
2. jQuery is used to make an AJAX call to load the json files
3. The utility functions provided by [underscore](http://underscorejs.org/) are then used to manipulate the data into the format necessary for Google charts as necessary for each individual page:
	- [Code for Page 01](https://github.com/simzou/cars-analysis/blob/gh-pages/js/page-01.js)
	- [Code for Page 02](https://github.com/simzou/cars-analysis/blob/gh-pages/js/page-02.js)
	- [Code for Page 03](https://github.com/simzou/cars-analysis/blob/gh-pages/js/page-03.js)
4. Data is then passed to [functions to make the charts](https://github.com/simzou/cars-analysis/blob/gh-pages/js/make_charts.js) and attach them to the page.
5. Pages were written in a mix of markdown and HTML syntax which is then automatically converted to html by github pages
	- [Home](https://github.com/simzou/cars-analysis/blob/gh-pages/index.md)
	- [Page 01](https://github.com/simzou/cars-analysis/blob/gh-pages/page-01.md)
	- [Page 02](https://github.com/simzou/cars-analysis/blob/gh-pages/page-02.md)
	- [Page 03](https://github.com/simzou/cars-analysis/blob/gh-pages/page-03.md)
	- [Page 04](https://github.com/simzou/cars-analysis/blob/gh-pages/page-04.md)
