#### Library Main Navigation: &nbsp; &nbsp; <b> [Ecosystem Library Home](https://github.com/NIH-NICHD-Ecosystem) </b> &nbsp; | &nbsp;[User Stories](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/README.md) &nbsp; | &nbsp; [Efforts](https://github.com/NIH-NICHD-Ecosystem/Efforts/blob/main/README.md) &nbsp; | &nbsp; [Library Help](https://github.com/NIH-NICHD-Ecosystem/LibraryHelp/blob/main/README.md)
</br><br/>

[![DOI](https://zenodo.org/badge/795587690.svg)](https://zenodo.org/badge/latestdoi/795587690)

# E1: Data Repository Finder

<br/> 

![Logo for the data repository finder effort website and an image of the website landing page.](./assets/E1-DRF-Overview.PNG) 


### The Data Repository Finder is an open-access, web-based tool that helps NICHD researchers find data repositories where they can share data as they develop and implement their NIH Data Management and Sharing Plans. Repositories are added on an ongoing basis.

### > Live in Beta. Visit the website at https://data-repository-finder.ll.mit.edu*
*\*External link, NIH is not responsible for content of external sites*

<br/>

# Table of Contents
- [Effort Overview](#effort-overview): high-level details and contact information
- [Effort Documentation](#effort-documentation): details the scope of the effort, including: 
    - [Use Cases Diagram](#use-cases-diagram) - use cases for the E1-Data Repository Finder effort and their relationships
    - [Use Cases and Origin User Stories](#use-cases-and-origin-user-stories) - overview of each use case, related actors, and their goals
    - [Source](#source) - Open-source codebase for the DRF web-based tool
- [User Stories](#user-stories)

<br/><br/>

# Effort Overview 
<p> Recognizing the need for researchers to find and use data repositories that address their specific data needs, NICHD developed a  tool to display information researchers need to complete their NIH Data Management and Sharing Plans when applying for NICHD funding. Information is manually extracted from the websites of repositories identified by NICHD's Office of Data Science and Sharing (ODSS) and includes details such as what data access tiers the repository supports and  data submission requirements. </p>
<p> Data repositories are included if they support the NIH definition of data sharing, which means making scientific data available to the public or broad research community, will accept data submissions from NICHD funded researchers without requiring special approvals, and meet other federal, NIH, and NICHD data repository criteria. </p> 
<p> The fields displayed in the Data Repository Finder were developed based on expected elements of Data Management and Sharing Plans and related definitions and principles rooted in the NIH Data Management and Sharing Policy. </p> 

#### Primary contact:  [Data-Repository-Finder-Support@ll.mit.edu](mailto:Data-Repository-Finder-Support@ll.mit.edu?subject=Data-Repository-Finder-Support)<br/>

#### Details: 
* <b> Built by:</b> MIT Lincoln Laboratory in REACT</br>
* <b> Hosted by:</b> MIT Lincoln Laboratory in their public AWS cloud environment<br/>
* <b> Sponsor contact:</b> Dr. Rebecca Rosen, Director of NICHD ODSS

<br/><br/>

# Effort Documentation

## Use Cases Diagram

Use cases diagrams are a standard [Unified Modeling Language (UML)](https://www.uml.org/what-is-uml.htm)* structure which summarizes the details of a system's users (called Actors) and their interactions with the system (called Use Cases). Multiple use cases detailed together in a use cases diagram are used to define the scope of an effort. Our use cases reference UML best practices informed by [User-Centered Design](https://www.usability.gov/what-and-why/user-centered-design.html)*. 

*\*External link, NIH is not responsible for content of external sites*

**Actors** can map to multiple users from User Stories, as they represent users who may have different titles within an organization but have similar goals or requirements within an Effort. 
</br>

</br>
<p align="center">
  <img src="https://github.com/NIH-NICHD-Ecosystem/E1_Data-Repository-Finder/blob/main/assets/E1-DRF-UseCasesDiagram-Sept23.PNG" width="900px" alt="Unified Modeling Language (UML) Use Cases Diagram of the Data Repository Finder effort.">
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

</br></br>

## Use Cases and Origin User Stories
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

## Source

Open-source codebase for the DRF web-based tool can be found on [Zenodo](https://zenodo.org/records/12688248). 
<br/><br/>

# User Stories
The following User Stories motivated and informed this Effort.

<br/>
<br/><br/>

| S#  | User Story | Current Problem | User Goal |
|----|----|----|-----|
|3| [As NICHD staff, I want to be able to update a given field in the Data Repository Finder and track the date and reason for the change, so that I can go back later and review why that decisions was made](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/stories/storyID-3.md) | DRF registration system does not yet support tracking changes| My goal is to track the provenance of edits made to the DRF and to document why the changes were made.|
| 30 | [As an NICHD researcher, I want to find the best data repositories for the sharing scientific data that I am generating in my project and understand the repository 's submission and sharing practices so  I can complete my Data Management and Sharing Plan](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/stories/storyID-30.md) | When I look at a data repository's website it can be difficult to determine the repository's requirements, expectations, and processes (e.g., accepted data types, metadata, formats, other standards, submission agreements, whether it is controlled access). It is also time consuming to look at many repository websites to determine if its appropriate. | My goal is to adhere to the expectations of the DMS Policy which expects maximizing the sharing of scientific data generated in my project |
| 31 | [As an NICHD program officer, I want to verify that researchers are using data repositories appropriate for the scientific data they plan to share and that their DMS Plan is consistent with the repository's expectations and requirements.](https://github.com/NIH-NICHD-Ecosystem/UserStories/blob/main/stories/storyID-31.md) | When I look at a data repository's website it can be difficult to determine the repository's requirements, expectations, and processes (e.g., accepted data types, metadata, formats, other standards, submission agreements, whether it is controlled access). It is also time consuming to look at many repository websites to determine if its appropriate.| My goal is to determine whether the researcher is adequately planning to share their scientific data in data repositories to adhere to the DMS Policy's expectations.|

<br/>



