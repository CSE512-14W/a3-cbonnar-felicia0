# Assignment 3

## Team Members

1. Caitlin Bonnar cbonnar@cs
2. Felicia Cordeiro felicia0@cs

## Food N' Stuff: An Interactive Food Photo Journal

Food N' Stuff is an interactive visualization tool for exploring your photo-based food journal. 

The photo pane displays the photos of your meals. By default, it shows all of the photos you've taken (as part of the food-journaling app DECAF, created by Felicia Cordeiro), which can be sorted by meal type, location, star rating, and date. Photo borders are colored according to the meal type to quickly let you differentiate between different meals of the day. 

Below the photo pane is an interactive bar chart which helps you discover trends about your meals. The y-axis allows you select between two measures: star rating and number of photos. The x-axis allows you to select between different categories of data associated with the meal: location, day of week, and number of people dined with. Hovering over a bar gives you details about the star rating and number of photos of that category. Clicking on the bar pertaining to a certain category (i.e. Home) will filter the photos in the photo pane to those pertaining only to that category. The active filter is shown above the bar chart. 

A screenshot of our final visualization is shown below.
![Screenshot of final visualization](http://mydecaf.org:9517/vizScreenshot.png)

## Running Instructions

Access our visualization [here!](http://mydecaf.org:9517/index.html)


## Story Board

[Check out our storyboard here!](http://mydecaf.org:9517/storyboard.pdf)  


### Changes between Storyboard and the Final Implementation

There was one feature from our storyboard mock-up that we didn't end up implementing, due to CSS/jQuery issues (and time constraint). That was the tool-tip for the photo, which would have given a more detailed description of the meal such as star rating, time consumed, place eaten, and written description. Otherwise our final visualization was layed out very similarly to our storyboard. 

## Development Process

###Breakdown:
**Caitlin:** Implemented the d3 barchart, cleaned and aggregated the data, created the "tips."

**Felicia:** Implemented the photopane, the sorting function, and filtering function.
Both of us worked on the storyboard and HTML/CSS aspects together. 

### Dev process/time spent on components
* We spent the first few days of the assignment (~8 hours) storyboarding our visualization. We used techniques like paper prototyping and iterative enhancement to refine our mockup. 
* We started by splitting the code into two main separate javascript files (and one main HTML file) so that we could begin parellilizing our work. Felicia began the photopane work and Caitlin began building the bar chart. 

Here is the breakdown:
* Porting the data: ~2 hours
* Cleaning and aggregating data: ~2 hours
* Configuring the bar chart and options for the axes (i.e. learning D3): ~7 hours
* Importing and formatting photo pane: ~4 hours 
* Filtering: ~2 hours
* Sorting: ~2 hours
* Bar chart interactions: ~2 hours
* Attempt to implement photo tooltip (It was working, but couldn't fix weird CSS issues): ~4 hours
* Cleanup: 1-2 hours

**Total time spent on project (among the two of us):** 34-35 hours


