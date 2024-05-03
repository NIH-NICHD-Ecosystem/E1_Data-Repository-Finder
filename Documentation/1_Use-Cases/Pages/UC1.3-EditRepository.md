#### Library Main Navigation: &nbsp; &nbsp;  [Ecosystem Use Case Library Home](https://github.com/NIH-NICHD-Ecosystem) &nbsp; | &nbsp;[User Stories](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/README.md)  &nbsp; | &nbsp; [Use Cases](https://github.com/NIH-NICHD-Ecosystem/UseCases/blob/main/README.md) &nbsp; | &nbsp; [Efforts](https://github.com/NIH-NICHD-Ecosystem/Efforts/blob/main/README.md) &nbsp; | &nbsp; [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md)
 
</br>
 
Each use case represents a specific interaction requirement from the User/Actor perspective. This page details the following:
- [Intended Workflow](#intended-workflow) which details the order of actions and describes actor decision points.
- [Sequence Diagram](#sequence-diagram) which models the flow of logic between actors and components in the system 
 
#### See [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md) for answers to questions about Library documentation and related terms.
 
<br/><br/>

# UC1.3: Edit Repository

<br/>

|  Related Efforts | Related User Stories 
| :-------------   | :-----|
| [E1: Data Repository Finder](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/README.md) | (enabling functionality)

<br/><br/>

# Intended Workflow

A workflow is a description of a set of tasks that are necessary to accomplish a given goal for a given actor or actors. The intended workflow breaks a given use case down into actor starting and end points, actions, and decision points to describe actions as well as relationships between actions. Library documents require a list of preconditions for the workflow, and a description of the actions in the workflow to accompany the diagram. 
</br></br></br>

<img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.3_Edit-Repository-Intended-Workflow.PNG" align="right" hspace="10" width="400px">

#### Preconditions
* Publisher, SME has an account with the system (becoms Publisher, SME Registered User)
* Publisher, SME Registered User is logged into the system 

#### Text Description

* (starting point) SME, Publisher Registered User who is logged in wants to edit a repository listing.
* They select a repository from repository list​
    - (Decision point) If they question the existing information in the information fields, they view the provenance (see [UC 1.4 View Provenance](UC1.4-ViewProvenance.md))
    - If not, they can choose to type text in the fields, select items from lists or similar, or pastes text into the fields provided.
* They note the changes made in the notes field.
* They select to preview the information as it would display in the UI
* (Decision point) If they determine the listing is ready for publisher review, they indicate the listing is ready to publish (end point).
    - If not,
        - (Decision point) and they have time to complete, they return to information review (see above)
        - Otherwise, they save a draft (end point).


<br clear="right"/>

<br/><br/><br/><br/><br/><br/>
 
# Sequence Diagram

<p align="center"><img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.3_Edit-Repository-Sequence-Diagram.PNG" width="600px">

#### Text Description 
 
An SME, Publisher Registered User who is logged in interacts with User Interface (UI) and Data Service components in the following manner:
1. They view the repository list in the UI
2. They select view details of a specific repository
    - UI passes the repository detail request to the Data Service
    - Data Service passes information to display the repository detail information in the UI
3.  They View Provenance (see [UC1.4 View Provenance](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.4-ViewProvenance.md))
4. They view the information fields
5. They type in information
6. They select items, or paste items
7. They add notes
8. They select to save a draft in the UI
    - UI validates field content
    - UI sends the information state to the Data Service
    - Data Service updates draft entry
    - Data Services sends the update to display in the UI
9. They indicate "ready to review" in the UI
    - UI sends the information state to the Data Services
    - Data Services flags the repository as ready to publish
    - Data Service sends the update to display in the UI

