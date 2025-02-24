#### Library Main Navigation: &nbsp; &nbsp;  <b> Ecosystem Library Home </b> &nbsp; | &nbsp;[User Stories](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/README.md) &nbsp; | &nbsp; [Efforts](https://github.com/NIH-NICHD-Ecosystem/Efforts/blob/main/README.md) &nbsp; | &nbsp; [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md)
 
</br>
 
Each use case represents a specific interaction requirement from the User/Actor perspective. This page details the following:
- [Intended Workflow](#intended-workflow) which details the order of actions and describes actor decision points.
- [Sequence Diagram](#sequence-diagram) which models the flow of logic between actors and components in the system 
 
#### See [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md) for answers to questions about Library documentation and related terms.
 
<br/><br/>

# UC1.2: Publish Repository

<br/>

|  Related Efforts | Related User Stories 
| :-------------  | :-----|
| [E1: Data Repository Finder](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/README.md) | (enabling functionality)

<br/><br/>

# Intended Workflow

A workflow is a description of a set of tasks that are necessary to accomplish a given goal for a given actor or actors. The intended workflow breaks a given use case down into actor starting and end points, actions, and decision points to describe actions as well as relationships between actions. Library documents require a list of preconditions for the workflow, and a description of the actions in the workflow to accompany the diagram. 
</br></br></br>

<img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.2_Publish-Repository-Intended-Workflow.PNG" alt="Intended workflow for the Publish Repository use case." align="right" hspace="10" width="400px">

#### Preconditions
- Publisher has an account with the system (becomes Publisher Registered User)
- Publisher Registered User is logged into the system


#### Text Description

- (Starting point) A Publisher Registered User wants to publish repository to the Data Repository Finder (DRF). 
- They select a repository of interest from the repository listing
- (Decision point) If they question the information in information fields, they view the provenance (see [UC 1.4 View Provenance](UC1.4-ViewProvenance.md))
- (Decision point) If there are edits they need to make, they edit repository fields (see [UC 1.3 Edit Repository](UC1.3-EditRepository.md)). ​
- They select to preview the information as it would be displayed in the Data Repository Finder
- (Decision point) If they determine the listing is ready to publish, they indicate the listing is ready to publish (end point), otherwise ​
  - (Decision point) If they have time to complete the information, they return to edit repository (see above)
  - If not, they save a draft of the information (end point).​

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

# Sequence Diagram
In UML, this diagram models the flow of logic within a system in a visual manner, enabling both documentation and validation of that logic. Sequence diagrams are commonly used for both analysis and design purposes. Library documentation requires a sequence diagram for each use case, and a description of the sequenced actions to accompany the diagram.  
</br>

<p align="center"><img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.2_Publish-Repository-Sequence-Diagram.PNG" alt="Sequence diagram for the Publish Repository use case."width="600px">

#### Text Description 

A Publisher Registered User who is logged in interacts with the UI and Data Service components in the following manner: 
1. They view the repository listing in the UI
2. They select to view details of a specific repository
   - UI passes the repository detail request to the Data Service
   - Data Service passes information to display the repository detail information in the UI
3. They View Provenance (see [UC1.4 View Provenance](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.4-ViewProvenance.md))
4. They Edit Repository (see [UC1.3 Edit Repository](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.3-EditRepository.md))
5. They select to preview the listing in the UI
   - UI updates display view
6. They select to save a draft in the UI
   - UI sends the information state to the Data Service
   - Data Service updates draft entry
   - Data Services sends the update to display in the UI
7. They indicate "ready to publish" in the UI
   - UI sends the information state to the Data Services
   - Data Services flags the repository as ready to publish
   - Data Service sends the update to display in the UI

