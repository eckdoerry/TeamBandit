import {React} from "react";

const InfoAndPolicies = ({courseInfo}) => {
    
    return(
        <div style={{padding:'25px'}}>
        <h1>{courseInfo.course_title}</h1>

        <h2> Click here to see: <a href = ""> Course Syllabus </a></h2>
        <h2> Policies and Best Practices </h2>
        <ul>
            <li><a href="">Formal policy and process</a> for dealing with non-performing team members
            <ul>
                <li><a href="">Template/example: Formal memo to dysfunctional teammate(s)</a></li>
                <li><a href="">Template/example: Response memo back to team</a></li>
            </ul>
            </li>
            <li><a href=""> Formal policy and process</a> for dealing with dysfunctional teams</li>
            <li><a href="">Late Work Policy</a> (open only in case of emergency!)</li>
            <li><a href="">Engineering Grading Scale</a> (from American Society for Engineering Education). What does a grade <em>really mean</em>? The expectations behind grades.</li>
            <li><a href="">Nice article</a> on managing non-performing team members </li>
        </ul>
        <h2>Compute Resources for supporting your Capstone project</h2>
        <p>Individual projects vary widely, of course, with computing needs varying accordingly. In CS, we are lucky that the main "supplies" we need for our projects are generally free: the laptops/desktops that we already use every day, and open source packages, IDEs, and other tools. There are some projects, however, that may need special resources; here are a couple of useful links.</p>
        <ul>
            <li><a href="">NAU ITS Policy Document</a> for creating webapps/sites for Capstone clients that are hosted on NAU servers.</li>
            <li><a href=""></a><a href="">Getting access to high-performance computing power</a> (project with machine learning, big data, and other compute-intensive stuff)</li>
            <li><a href="">Cloud-hosting for webapps and mobile app backends</a>.  </li>
        </ul>
        <h2>Important Links, Policies and Procedures</h2>
        <ul>
            <li><a href="">CS Capstone FAQ (frequently asked questions).</a> Things students have asked about...</li>
            <li><a href="">Instructions on creating easy-to-use task report</a> for your mentor, including a pre-fab template</li>
            <li>Some <a href="">Tips for improving your presentations</a></li>
            <li>Dr D's distilled <a href="">Tech Writing QuickRef</a> for improving your writing,  based on 15 years experience with what Capstone teams often fall down on.</li>
            <li><a href="">Cool website</a> dedicated to creating high quality project poster. Check out the "key posts"!</li>
            <li><a href="">Nice article</a> on managing non-performing team members</li>
            <li><strong>VIDEO PRESENTATIONS.</strong> Especially during COVID-time, many presentations may be delivered as videos rather than to a live audience. To help with this, I did some legwork to get you a start. Here is a <a href="BestPractices/Making Video Presentations.pdf">quick overview of some ideas and options</a> for doing your videos. This is by no means complete, it's just a leg up to get you started on your own ideas! We also were able to collect <a href="BestPractices/video-best-practice.html">some great "best practice" ideas from Spring 2020 Capstone teams</a> that produced excellent videos of their final presentations. </li>
        </ul>
        <p>&nbsp;</p>
        <h2>About the Instructors</h2>
        <p>The CS Capstone Sequence is a collaborative effort between CS faculty and graduate students aimed at efficiently delivering a superior Capstone experience, while engaging a maximum number of faculty and their expert perspectives in the process.</p>
        <h3>Course Organizer</h3>
        <p>The Course Organizer is the lead faculty member responsible for the course, trains and supervises the Team Mentors, resolves problems and conflicts, and serves as the final authority for all class-related matters. The Organizer shapes the entire experience by working with industry and other outside contacts to solicit, evaluation, refine, and present the projects proposed for each year's sequence. The Organizer  also sets the calendar schedule for the course and its deliverables, and generally makes sure that things are rolling smoothly.  In the initial semester (CS476, Requirements Acquisition), the Organizer presents the lecture portion of the course, which includes not just lectures but much in-class discussion of best practices, deliverables quality and planning, small presentations, and other in-class exercises...while also training and working with the Team Mentors, who develop a close working relationship with each team and have primary responsibility for evaluating individual team performance. In the second semester (CS486, Capstone Design), the Organizer continues as overall organizer and final authority for all course matters, but the Team Mentors move into more central focus as the maximum effort shifts towards getting each team's planned software product implemented, tested and refined, and delivered to the project client.</p>
        <p>Dr. Eck Doerry</p>
        <p>Professor of Computer Science</p>
        <p>School of Informatics, Computing and Cyber Systems (SICCS)</p>
        <p><strong>Office:</strong> Rm. 217, SICCS Building (bldg. 90)</p>
        <p><strong>Email:</strong> Eck.Doerry@nau.edu</p>
        <a href="">Dr. D's Current Office Schedule</a> 
        <h3>Dedicated Team Mentors</h3>    
        <p>Graduate Team Mentors are a vital part of the CS Capstone concept, bringing a wide variety of expertise to bear for their assigned Capstone teams. As teams are formed and team mentors are assigned, mentors are able to select projects that they are particularly interested in or have relevant experience for. As the two-semester sequence progresses, Team Mentors play an increasingly intensive role in mentoring the team, monitoring project progress, and helping evaluating the extent to which each team member is contributing to team products and meeting the specific learning goals set for Capstone.</p>    
        </div>
    );
}

export default InfoAndPolicies;