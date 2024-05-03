#### Library Main Navigation: &nbsp; &nbsp;  [Ecosystem Use Case Library Home](https://github.com/NIH-NICHD-Ecosystem) &nbsp; | &nbsp;[User Stories](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/README.md)  &nbsp; | &nbsp; [Use Cases](https://github.com/NIH-NICHD-Ecosystem/UseCases/blob/main/README.md) &nbsp; | &nbsp; [Efforts](https://github.com/NIH-NICHD-Ecosystem/Efforts/blob/main/README.md) &nbsp; | &nbsp; [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md)

</br>

# [E1: Data Repository Finder](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/README.md): Effort Documentation

The following content describes the scope of the Data Repository Finder Effort: 
- The [Use Cases Diagram](#use-cases-diagram) shows use cases for the E1-Data Repository Finder effort and their relationships

- The [Use Cases and Origin User Stories](#use-cases-and-origin-user-stories) provides an overview of each use case, related actors, and their goals. Clicking on a use case in the table will bring you to a page with the use case's *workflow*, *sequence diagram*, and *requirements list*. 

- Files for the project can be accessed under [Documentation Files](#documentation-files) 

##### See [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md) for answers to questions about Library documentation and terms. 
##### See the overview page [E1 Data Repository Finder](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/README.md) to answer questions about the Data Repository Finder effort.

</br>

# Use Cases Diagram

Use cases diagrams are a standard [Unified Modeling Language (UML)](https://www.uml.org/what-is-uml.htm)* structure which summarizes the details of a system's users (called Actors) and their interactions with the system (called Use Cases). Multiple use cases detailed together in a use cases diagram are used to define the scope of an effort. Our use cases reference UML best practices informed by [User-Centered Design](https://www.usability.gov/what-and-why/user-centered-design.html)*. 

*\*External link, NIH is not responsible for content of external sites*

**Actors** can map to multiple users from User Stories, as they represent users who may have different titles within an organization but have similar goals or requirements within an Effort. 
</br>

</br>
<p align="center">
  <img src="../assets/E1-DRF-UseCasesDiagram-Sept23.PNG" width="900px" alt="Unified Modeling Language (UML) Use Cases Diagram of the Data Repository Finder effort.">
</p>
</br>

<details>
<summary> Text description of the Use Cases Diagram </summary>
The Data Repository Finder has three primary actors: A repository Subject Matter Expert (SME), a Repository Publisher, and a Repository Searcher. 
For a Repository Searcher, the main use case is to identify a repository, which includes selecting a repository.
For a Repository SME, the main use case is to add a repository, which includes editing a repository, and selecting a repository. 
For a Repository Publisher, the main use case is to publish a repository, which includes editing a repository, and selecting a repository.
Viewing provenance extends editing and publishing a repository, and includes selecting a repository. 

</details>

# Use Cases and Origin User Stories
</br>

| UC# | Use Case | Actors | User Story | 
| :--------|:-----------|:------------------------------- | :------------------------------- | 
| UC1.1 | [Add repository](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.1_Add-Repository.md) | Repository SME | <ul><li> (enabling functionality)</li></ul>
| UC1.2 | [Publish repository](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.2-PublishRepository.md) | Repository Publisher | <ul><li> (enabling functionality)</li></ul>
| UC1.3 | [Edit Repository](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.3-EditRepository.md) | Repository SME, Repository Publisher | <ul><li> [S3: As NICHD staff, I want to be able to update a given field in the Data Repository Finder and track the date and reason for  the change, so that I can go back later and review why that decisions was made ](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/stories/storyID-3.md)</li></ul> 
| UC1.4 | [View Provenance](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.4-ViewProvenance.md) | Repository Publisher | <ul><li> [S3: As NICHD staff, I want to be able to update a given field in the Data Repository Finder and track the date and reason for  the change, so that I can go back later and review why that decisions was made ](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/stories/storyID-3.md)</li></ul> 
| UC1.5 | [Identify Repository](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/Documentation/1_Use-Cases/Pages/UC1.5-IdentifyRepository.md) | Repository Searcher | <ul><li> [S30: As an NICHD researcher, I want to find the best data repositories for the sharing scientific data that I am generating in my project and understand the repository 's submission and sharing practices so  I can complete my Data Management and Sharing Plan](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/stories/storyID-30.md) </li></ul><ul><li> [S31: As an NICHD program officer, I want to verify that researchers are using data repositories appropriate for the scientific data they plan to share and that their DMS Plan is consistent with the repository's expectations and requirements.](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/stories/storyID-31.md) </li></ul>
<br/>

## Use Case Actors, Goals, and Related Users from User Stories

<br/>

| Actors  | Actor Goal |  Related Users  | 
| :---------------- |:------------------------------- | :------------------------------- | 
| Repository SME  | Subject Matter Expert (SME) goal is to ensure their repository is listed, findable, and represented accurately  |  NICHD Staff, Other 
| Repository Publisher  | Publisher goal is to ensure the information entered for a given repository matches display intent and meets/exceeds quality checks before the public can see the information |  NICHD Staff, Other 
| Repository Searcher |  Searcher goal is to find a data repository that matches their internal search criteria (e.g., I need a repository that handles genomic data)  |  NICHD Researchers, NICHD Staff, Participant Community, Other 

<br/>

# [Documentation Files](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/tree/main/Documentation)

* [1_Use-Cases](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/tree/main/Documentation/1_Use-Cases): Formalized documentation describing interaction requirements and Effort scope.

* [2_Supplemental](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/tree/main/Documentation/2_Supplemental): Other documentation describing Effort design and build decisions. 

* [3_Code](https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/tree/main/Documentation/3_Code): Effort code files (coming soon)
