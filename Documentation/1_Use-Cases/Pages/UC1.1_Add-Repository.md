#### Library Main Navigation: &nbsp; &nbsp;  [Ecosystem Use Case Library Home](https://github.com/NIH-NICHD-Ecosystem) &nbsp; | &nbsp;[User Stories](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/README.md)  &nbsp; | &nbsp; [Use Cases](https://github.com/NIH-NICHD-Ecosystem/UseCases/blob/main/README.md) &nbsp; | &nbsp; [Efforts](https://github.com/NIH-NICHD-Ecosystem/Efforts/blob/main/README.md) &nbsp; | &nbsp; [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md)
 
</br>
 
Each use case represents a specific interaction requirement from the User/Actor perspective. This page details the following:
- [Intended Workflow](#intended-workflow) which details the order of actions and describes actor decision points.
- [Sequence Diagram](#sequence-diagram) which models the flow of logic between actors and components in the system 
 
#### See [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md) for answers to questions about Library documentation and related terms.
 
<br/><br/>
 
# UC1.1: Add Repository
 
<br/>
 
| Related Efforts | Effort Documentation | Related User Stories 
| :-------------  | :------------- | :-----|
| [E1: Data Repository Finder](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/README.md) | [Use Cases Diagram](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/Use-Cases-Overview.md) | (enabling functionality)
 
<br/><br/>
 
# Intended Workflow

A workflow is a description of a set of tasks that are necessary to accomplish a given goal for a given actor or actors. The intended workflow breaks a given use case down into actor starting and end points, actions, and decision points to describe actions as well as relationships between actions. Library documents require a list of preconditions for the workflow, and a description of the actions in the workflow to accompany the diagram. 
</br></br></br>

<img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.1_Add-Repository-Intended-Workflow.PNG" alt="Intended workflow for the Add Repository use case." align="right" hspace="10" width="400px">
 
#### Preconditions
- Subject Matter Expert (SME) has been given an account with the system (becomes SME Registered User)
- SME Registered User is logged into the system
 
 
#### Text Description
 
- (Starting point) An SME Registered User who is logged in wants to add a repository to the repository listing.
- They select to add a repository, then
- They edit repository (see [UC 1.3 Edit Repository](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.3-EditRepository.md)), then
- They preview the listing information, then
- (Decision point) If they determine the information is ready for publisher review, they indicate the listing is ready for review (end point), otherwise
- (Decision point) If they have time to complete the information, they return to edit repository (see above).
- If not, they save a draft of the information (end point). 

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
 
# Sequence Diagram
In UML, this diagram models the flow of logic within a system in a visual manner, enabling both documentation and validation of that logic. Sequence diagrams are commonly used for both analysis and design purposes. Library documentation requires a sequence diagram for each use case, and a description of the sequenced actions to accompany the diagram.  
</br>

<p align="center"><img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.1_Add-Repository-Sequence-Diagram.PNG" alt="Sequence diagram for the Add Repository use case. Text description describes the workflow steps."width="600px"></p>
 
#### Text Description 
 
An SME Registered User who is logged in interacts with User Interface (UI) and Data Service components in the following manner:
1. They view the repository management page in the UI
2. They select to "add repository" in the UI
    - UI passes the request to the Data Service
    - Data Service creates a new entry flagged as draft
    - Data Service passes information to display Edit Repository content to the UI
3. They add information to the repository listing in the UI
    - UI sends information state to the Data Service
    - Data Service updates draft entry
    - Data Service sends the update to display in the UI, then SME either Adds more information (loops to step 3), or continues
4. They select to preview the listing in the UI
    - UI updates its display view, then SME either adds more information (loop to step 3), or continues
5.  They Edit Repository (see [UC 1.3 Edit Repository](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.3-EditRepository.md))
6. They select  to save a draft in the UI
    - UI sends the information state to the Data Service
    - Data Service updates draft entry
    - Data Service sends the update to display in the UI
7. They indicate "ready to review" in the UI
    - UI sends the information state to the Data Service
    - Data Service flags the repository as ready to review
    - Data Service sends the update to display in the UI


