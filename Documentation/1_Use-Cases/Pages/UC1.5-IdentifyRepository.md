#### Library Main Navigation: &nbsp; &nbsp;  <b> Ecosystem Library Home </b> &nbsp; | &nbsp;[User Stories](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/README.md) &nbsp; | &nbsp; [Efforts](https://github.com/NIH-NICHD-Ecosystem/Efforts/blob/main/README.md) &nbsp; | &nbsp; [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md)
 
</br>
 
Each use case represents a specific interaction requirement from the User/Actor perspective. This page details the following:
- [Intended Workflow](#intended-workflow) which details the order of actions and describes actor decision points.
- [Sequence Diagram](#sequence-diagram) which models the flow of logic between actors and components in the system 
 
#### See [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md) for answers to questions about Library documentation and related terms.
 
<br/><br/>
 

# UC1.5: Identify Repository

<br/>

|  Related Efforts | Related User Stories 
| :-------------   | :-----|
| [E1: Data Repository Finder](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/README.md) | (enabling functionality)

<br/><br/>

# Intended Workflow

A workflow is a description of a set of tasks that are necessary to accomplish a given goal for a given actor or actors. The intended workflow breaks a given use case down into actor starting and end points, actions, and decision points to describe actions as well as relationships between actions. Library documents require a list of preconditions for the workflow, and a description of the actions in the workflow to accompany the diagram. 


<img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.5_Identify-Repository-Intended-Workflow.PNG" alt="Intended workflow for the Identify Repository use case." align="right" hspace="10" width="400px">

#### Preconditions

* None

#### Text Description

* (Starting point) Repository Searcher wants to find a data repository. 
* They view the repository list. 
* (Decision point) If they do not understand the terms used, they select to view definitions. Otherwise,
* (Decision point) If they do not see a repository of interest, they use the filters provided. Otherwise, 
* (Decision point) If they need more detail, they
      - View the details page for the repository​, or
      - Visit the repository URL (external), or
      - Select to visit the repository fairsharing.org listing​ (external)
  Otherwise, 
* (Decision point) If a number of repositories are of interest, they select to compare the repositories. Otherwise, 
* (Decision point) If they see a repository that meets their needs, they identify the repository (End point), otherwise they return to use filters step above.

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

# Sequence Diagram
In UML, this diagram models the flow of logic within a system in a visual manner, enabling both documentation and validation of that logic. Sequence diagrams are commonly used for both analysis and design purposes. Library documentation requires a sequence diagram for each use case, and a description of the sequenced actions to accompany the diagram.  
</br>

<p align="center"><img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.5_Identify-Repository-Sequence-Diagram.PNG" alt="Sequence diagram for the Add Repository use case. Text description describes the workflow steps."width="600px">

#### Text Description 
A Repository Searcher interacts with the User Interface (UI) component, Data Service component, and External Websites in the following manner: 

1. They view the repository list in the UI.
2. They select to view definitions.
      - UI requests definitions from the Data Service
      - Data Service returns definition information to display in the UI   
3. They make a filter selection.
      - UI passes filter criteria to the Data Service
      - Data Service filters the data and returns filtered display list to the UI
4. They select to view repository details.
      - UI requests repository detail information from the Data Service
      - Data Service returns repository detail information to display in the UI
5. They select the repository landing website URL.
      - UI directs to repository landing website (external)
6. They select fairsharing.org repository listing URL.
      - UI directs to fairsharing.org repository listing website page (external) 
7. They select a repository to compare.
      - UI updates display (loops to beginning of step 7)
8. They select to view comparison.
      - UI requests comparison information from the Data Service.
      - Data Service returns the comparison information to display in the UI
9. They identify and view a repository of interest. 


