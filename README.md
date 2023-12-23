# Introduction 
Organize an event, invite family members, ask for their preferences and match them as everyone has its dreamy gift.

# Actors
- Organizer
- Participant

# Scenario
<ol>
<li>As an Organizer provide emails and nicknames of all participants you plan to invite</li>
<li>Click 'SEND' button</li>
<li>As an participant click on the link in email-invitation</li>
<li>Choose from the list all participants you know what to buy as a gift</li>
<li>Click 'SEND' button</li>
<li>As an Organizer go to mailbox and click in every link sent by participants</li>
<li>Do not use private mode in browser? check how cookie gonna behave</li>
<li>Automatically detect when the last link is clicked, so instead of closing window, the component gonna be transformed to final step</li>
<li>As a final step display the status of the analysis: in progress, done</li>
<li>In case analysis ends with success automatically send emails to all participants with details about whom you need to buy a dreamy gift</li>
<li>In case of failure resend email-invitation with a reduced amount of participants you may exclude from list</li>
<li>Repeat the flow till success</li>
</ol>

# Some constraints
 - minimal amout of participants, organizer included: 3
 - maximal amount: 1024 -> select all etc.
