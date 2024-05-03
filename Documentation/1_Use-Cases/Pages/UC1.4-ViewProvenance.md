#### Library Main Navigation: &nbsp; &nbsp;  [Ecosystem Use Case Library Home](https://github.com/NIH-NICHD-Ecosystem) &nbsp; | &nbsp;[User Stories](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/README.md)  &nbsp; | &nbsp; [Use Cases](https://github.com/NIH-NICHD-Ecosystem/UseCases/blob/main/README.md) &nbsp; | &nbsp; [Efforts](https://github.com/NIH-NICHD-Ecosystem/Efforts/blob/main/README.md) &nbsp; | &nbsp; [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md)
 
</br>
 
Each use case represents a specific interaction requirement from the User/Actor perspective. This page details the following:
- [Intended Workflow](#intended-workflow) which details the order of actions and describes actor decision points.
- [Sequence Diagram](#sequence-diagram) which models the flow of logic between actors and components in the system 
 
#### See [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md) for answers to questions about Library documentation and related terms.
 
<br/><br/>

# UC1.4: View Provenance

<br/>

|  Related Efforts  | Related User Stories 
| :-------------  | :-----|
| [E1: Data Repository Finder](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/README.md) | (enabling functionality)

<br/><br/>
 
# Intended Workflow

A workflow is a description of a set of tasks that are necessary to accomplish a given goal for a given actor or actors. The intended workflow breaks a given use case down into actor starting and end points, actions, and decision points to describe actions as well as relationships between actions. Library documents require a list of preconditions for the workflow, and a description of the actions in the workflow to accompany the diagram. 
</br></br></br>

<p align="center"><img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.4_View-Provenance-Intended-Workflow.PNG" alt="Intended workflow for the View Provenance use case." width="600px">

#### Preconditions
- Publisher has been given an account with the system (becomes Publisher Registered User)
- Publisher Registered User is logged into the system
- Publisher Registered User views repository details page

 
#### Text Description

* (Starting point) Publisher Registered User views repository information fields.
* They view the change notes field in UI. 
* (Decision point) If they need more information, they request the change log from the developer, then view the change log sent from the developer. Otherwise, 
* (Decision point) If they agree with past decisions indicated in the change notes and/or change log, they publish the repository (see [UC 1.2 Publish Repository](UC1.2-PublishRepository.md)) (end point), otherwise
* They contact a Subject Matter Expert (SME) who edits the repository (see  [UC 1.3 Edit Repository](UC1.3-EditRepository.md)) (end point).

<br/><br/><br/>
 
# Sequence Diagram
In UML, this diagram models the flow of logic within a system in a visual manner, enabling both documentation and validation of that logic. Sequence diagrams are commonly used for both analysis and design purposes. Library documentation requires a sequence diagram for each use case, and a description of the sequenced actions to accompany the diagram.  
</br>

<p align="center"><img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Assets/UC1.4_View-Provenance-Sequence-Diagram.PNG" alt="Sequence diagram for the View Provenance use case. Text description describes the workflow steps."width="600px">>

#### Text Description 
A Publisher Registered User who is logged in interacts with the User Interface(UI) component, Developer (Actor), and SME (Actor) in the following manner: 

1. They view the repository information fields in the UI
2. They view the change notes in the UI
3. They request the change log from the Developer (Actor).
   -  Developer sends the change log.
4. They publish the repository (see [UC 1.2 Publish Repository](UC1.2-PublishRepository.md))
5. They contact the SME (Actor).
6. SME edits the repository (see  [UC 1.3 Edit Repository](UC1.3-EditRepository.md))


