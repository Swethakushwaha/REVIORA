// ============================================
// StudyPulse - Main JavaScript
// ============================================


// ============================================
// DOM Elements
// ============================================

const totalSubjects =
    document.getElementById("totalSubjects");

const averageReadiness =
    document.getElementById("averageReadiness");

const needRevision =
    document.getElementById("needRevision");

const totalStudyTime =
    document.getElementById("totalStudyTime");

const studyStreak =
    document.getElementById("studyStreak");

const subjectsContainer =
    document.getElementById("subjectsContainer");

const subjectName =
    document.getElementById("subjectName");

const subjectReadiness =
    document.getElementById("subjectReadiness");

const addSubjectBtn =
    document.getElementById("addSubjectBtn");

const attentionTopics =
    document.getElementById("attentionTopics");

const smartRevision =
    document.getElementById("smartRevision");

const weeklyStudyHours =
    document.getElementById("weeklyStudyHours");

const weeklySessions =
    document.getElementById("weeklySessions");

const weeklyAverage =
    document.getElementById("weeklyAverage");

const mostStudiedSubject =
    document.getElementById("mostStudiedSubject");

const achievements =
    document.getElementById("achievements");


// ============================================
// Default Subjects
// ============================================

const defaultSubjects = [

    {
        name: "DBMS",
        readiness: 0
    },

    {
        name: "Software Engineering",
        readiness: 0
    },

    {
        name: "Computer Networks",
        readiness: 0
    },

    {
        name: "Operating Systems",
        readiness: 0
    },

    {
        name: "Data Structures",
        readiness: 0
    },

    {
        name: "Java",
        readiness: 0
    },

    {
        name: "Python",
        readiness: 0
    },

    {
        name: "Web Development",
        readiness: 0
    },

    {
        name: "Cyber Security",
        readiness: 0
    },

    {
        name: "Artificial Intelligence",
        readiness: 0
    }

];


// ============================================
// Get Initial Subjects
// ============================================

function getInitialSubjects() {

    const savedSubjects =
        localStorage.getItem("subjects");


    if (savedSubjects) {

        try {

            return JSON.parse(savedSubjects);

        } catch (error) {

            console.error(
                "Could not load subjects:",
                error
            );

        }

    }


    const profile =
        JSON.parse(
            localStorage.getItem("studentProfile")
        );


    if (
        profile &&
        profile.subjects &&
        profile.subjects.length > 0
    ) {

        const profileSubjects =
            profile.subjects.map(
                function(subject) {

                    return {

                        name: subject,
                        readiness: 0

                    };

                }
            );


        localStorage.setItem(
            "subjects",
            JSON.stringify(profileSubjects)
        );


        return profileSubjects;

    }


    localStorage.setItem(
        "subjects",
        JSON.stringify(defaultSubjects)
    );


    return defaultSubjects;

}


// ============================================
// Load Subjects
// ============================================

let subjects =
    getInitialSubjects();


// ============================================
// Save Subjects
// ============================================

function saveSubjects() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

}


// ============================================
// Calculate Overall Readiness
// ============================================

function calculateReadiness() {

    if (subjects.length === 0) {

        return 0;

    }


    const total =
        subjects.reduce(
            function(sum, subject) {

                return sum +
                    Number(subject.readiness || 0);

            },
            0
        );


    return Math.round(
        total / subjects.length
    );

}


// ============================================
// Priority Level
// ============================================

function getPriority(readiness) {

    readiness =
        Number(readiness) || 0;


    if (readiness < 40) {

        return "High";

    }


    if (readiness < 60) {

        return "Medium";

    }


    return "Low";

}


// ============================================
// Render Subjects
// ============================================

function renderSubjects() {

    if (!subjectsContainer) {

        return;

    }


    subjectsContainer.innerHTML = "";


    subjects.forEach(
        function(subject, index) {

            const readiness =
                Number(subject.readiness) || 0;

            const priority =
                getPriority(readiness);


            const card =
                document.createElement("div");

            card.className =
                "subject-card";


            card.innerHTML = `

                <div class="subject-card-header">

                    <h3>
                        ${subject.name}
                    </h3>

                    <span class="priority-badge priority-${priority.toLowerCase()}">
                        ${priority} Priority
                    </span>

                </div>


                <p>
                    Readiness:
                    <strong>${readiness}%</strong>
                </p>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width: ${readiness}%"
                    ></div>

                </div>


                <div class="subject-actions">

                    <button
                        onclick="editSubject(${index})"
                    >
                        Edit
                    </button>

                    <button
                        onclick="deleteSubject(${index})"
                    >
                        Delete
                    </button>

                </div>

            `;


            subjectsContainer.appendChild(card);

        }
    );

}


// ============================================
// Add Subject
// ============================================

if (addSubjectBtn) {

    addSubjectBtn.addEventListener(
        "click",
        function() {

            const name =
                subjectName.value.trim();

            const readiness =
                Number(subjectReadiness.value);


            if (!name) {

                alert(
                    "Please enter a subject name."
                );

                return;

            }


            if (
                isNaN(readiness) ||
                readiness < 0 ||
                readiness > 100
            ) {

                alert(
                    "Readiness must be between 0 and 100."
                );

                return;

            }


            const alreadyExists =
                subjects.some(
                    function(subject) {

                        return (
                            subject.name.toLowerCase() ===
                            name.toLowerCase()
                        );

                    }
                );


            if (alreadyExists) {

                alert(
                    "This subject already exists."
                );

                return;

            }


            subjects.push({

                name: name,
                readiness: readiness

            });


            subjectName.value = "";
            subjectReadiness.value = "";


            saveAndRender();

        }
    );

}


// ============================================
// Edit Subject
// ============================================

function editSubject(index) {

    const subject =
        subjects[index];


    if (!subject) {

        return;

    }


    const newName =
        prompt(
            "Enter subject name:",
            subject.name
        );


    if (newName === null) {

        return;

    }


    const trimmedName =
        newName.trim();


    if (!trimmedName) {

        alert(
            "Subject name cannot be empty."
        );

        return;

    }


    const newReadiness =
        prompt(
            "Enter readiness percentage (0-100):",
            subject.readiness
        );


    if (newReadiness === null) {

        return;

    }


    const readiness =
        Number(newReadiness);


    if (
        isNaN(readiness) ||
        readiness < 0 ||
        readiness > 100
    ) {

        alert(
            "Readiness must be between 0 and 100."
        );

        return;

    }


    subject.name =
        trimmedName;

    subject.readiness =
        readiness;


    saveAndRender();

}


// ============================================
// Delete Subject
// ============================================

function deleteSubject(index) {

    const subject =
        subjects[index];


    if (!subject) {

        return;

    }


    const confirmed =
        confirm(
            `Delete ${subject.name}?`
        );


    if (!confirmed) {

        return;

    }


    subjects.splice(
        index,
        1
    );


    saveAndRender();

}


// ============================================
// Dashboard
// ============================================

function updateDashboard() {

    if (totalSubjects) {

        totalSubjects.textContent =
            subjects.length;

    }


    if (averageReadiness) {

        averageReadiness.textContent =
            calculateReadiness() + "%";

    }


    if (needRevision) {

        const revisionCount =
            subjects.filter(
                function(subject) {

                    return (
                        Number(subject.readiness) < 50
                    );

                }
            ).length;


        needRevision.textContent =
            revisionCount;

    }


    const sessions =
        JSON.parse(
            localStorage.getItem(
                "studySessions"
            )
        ) || [];


    const totalHours =
        sessions.reduce(
            function(total, session) {

                return total +
                    Number(session.hours || 0);

            },
            0
        );


    if (totalStudyTime) {

        totalStudyTime.textContent =
            totalHours;

    }


    if (studyStreak) {

        studyStreak.textContent =
            calculateStudyStreak();

    }

}


// ============================================
// Attention Topics
// ============================================

function updateAttentionTopics() {

    if (!attentionTopics) {

        return;

    }


    const weakSubjects =
        subjects.filter(
            function(subject) {

                return (
                    Number(subject.readiness) < 50
                );

            }
        );


    if (weakSubjects.length === 0) {

        attentionTopics.innerHTML =
            "<p>Great! No subjects need urgent attention. 🎉</p>";

        return;

    }


    attentionTopics.innerHTML = "";


    weakSubjects.forEach(
        function(subject) {

            const item =
                document.createElement("div");

            item.className =
                "attention-item";


            item.innerHTML = `

                <strong>
                    ${subject.name}
                </strong>

                <span>
                    ${Number(subject.readiness)}% readiness
                </span>

            `;


            attentionTopics.appendChild(item);

        }
    );

}


// ============================================
// Smart Revision
// ============================================

function updateSmartRevision() {

    if (!smartRevision) {

        return;

    }


    const revisionSubjects =
        subjects
            .filter(
                function(subject) {

                    return (
                        Number(subject.readiness) < 60
                    );

                }
            )
            .sort(
                function(a, b) {

                    return (
                        Number(a.readiness) -
                        Number(b.readiness)
                    );

                }
            );


    if (revisionSubjects.length === 0) {

        smartRevision.innerHTML =
            "<p>You're doing great! No immediate revision priority. 🎉</p>";

        return;

    }


    smartRevision.innerHTML = "";


    revisionSubjects.forEach(
        function(subject, index) {

            const item =
                document.createElement("div");

            item.className =
                "revision-item";


            const label =
                index === 0
                    ? "🔥 Focus first"
                    : "⚠️ Revise next";


            item.innerHTML = `

                <strong>
                    ${label}
                </strong>

                <p>
                    ${subject.name}
                    -
                    ${Number(subject.readiness)}%
                    readiness
                </p>

            `;


            smartRevision.appendChild(item);

        }
    );

}


// ============================================
// Study Goal
// ============================================

const targetReadiness =
    document.getElementById("targetReadiness");

const examDate =
    document.getElementById("examDate");

const saveGoalBtn =
    document.getElementById("saveGoalBtn");

const goalCurrentReadiness =
    document.getElementById(
        "goalCurrentReadiness"
    );

const goalProgress =
    document.getElementById("goalProgress");

const examCountdown =
    document.getElementById("examCountdown");

const goalStatus =
    document.getElementById("goalStatus");


// ============================================
// Save Goal
// ============================================

if (saveGoalBtn) {

    saveGoalBtn.addEventListener(
        "click",
        function() {

            const target =
                Number(targetReadiness.value);

            const date =
                examDate.value;


            if (
                isNaN(target) ||
                target < 1 ||
                target > 100
            ) {

                alert(
                    "Target readiness must be between 1 and 100."
                );

                return;

            }


            if (!date) {

                alert(
                    "Please select an exam date."
                );

                return;

            }


            localStorage.setItem(
                "studyGoal",
                JSON.stringify({

                    target: target,
                    examDate: date

                })
            );


            updateStudyGoal();

            updateAchievements();

        }
    );

}


// ============================================
// Update Study Goal
// ============================================

function updateStudyGoal() {

    if (
        !goalCurrentReadiness &&
        !goalProgress &&
        !examCountdown &&
        !goalStatus
    ) {

        return;

    }


    const savedGoal =
        JSON.parse(
            localStorage.getItem(
                "studyGoal"
            )
        );


    if (!savedGoal) {

        if (goalCurrentReadiness) {

            goalCurrentReadiness.textContent =
                "0%";

        }

        if (goalProgress) {

            goalProgress.textContent =
                "0%";

        }

        if (examCountdown) {

            examCountdown.textContent =
                "No exam date set";

        }

        if (goalStatus) {

            goalStatus.textContent =
                "Set a study goal to get started.";

        }

        return;

    }


    const current =
        calculateReadiness();

    const target =
        Number(savedGoal.target);


    if (goalCurrentReadiness) {

        goalCurrentReadiness.textContent =
            current + "%";

    }


    const progress =
        Math.min(
            Math.round(
                (current / target) * 100
            ),
            100
        );


    if (goalProgress) {

        goalProgress.textContent =
            progress + "%";

    }


    const today =
        new Date();

    const exam =
        new Date(
            savedGoal.examDate +
            "T00:00:00"
        );


    const difference =
        Math.ceil(
            (
                exam - today
            ) /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    if (examCountdown) {

        if (difference > 0) {

            examCountdown.textContent =
                difference +
                " day(s) remaining";

        } else if (difference === 0) {

            examCountdown.textContent =
                "Exam is today!";

        } else {

            examCountdown.textContent =
                "Exam date has passed.";

        }

    }


    if (goalStatus) {

        if (current >= target) {

            goalStatus.textContent =
                "🎉 Goal achieved!";

        } else {

            goalStatus.textContent =
                "Keep studying. You can reach your goal! 💪";

        }

    }

}


// ============================================
// Today's Date
// ============================================

function getTodayDate() {

    const now =
        new Date();


    return (
        now.getFullYear() +
        "-" +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            now.getDate()
        ).padStart(2, "0")
    );

}


// ============================================
// Study Session Elements
// ============================================

const toggleSessionBtn =
    document.getElementById(
        "toggleSessionBtn"
    );

const studySessionForm =
    document.getElementById(
        "studySessionForm"
    );

const sessionSubject =
    document.getElementById(
        "sessionSubject"
    );

const sessionHours =
    document.getElementById(
        "sessionHours"
    );

const sessionDate =
    document.getElementById(
        "sessionDate"
    );

const saveSessionBtn =
    document.getElementById(
        "saveSessionBtn"
    );

const studyHistory =
    document.getElementById(
        "studyHistory"
    );


// ============================================
// Toggle Study Session Form
// ============================================

if (toggleSessionBtn && studySessionForm) {

    toggleSessionBtn.addEventListener(
        "click",
        function() {

            if (
                studySessionForm.style.display ===
                "none" ||
                studySessionForm.style.display ===
                ""
            ) {

                studySessionForm.style.display =
                    "block";

                toggleSessionBtn.textContent =
                    "− Hide Study Session";

            } else {

                studySessionForm.style.display =
                    "none";

                toggleSessionBtn.textContent =
                    "+ Add Study Session";

            }

        }
    );

}


// ============================================
// Update Session Subject Options
// ============================================

function updateSessionSubjectOptions() {

    if (!sessionSubject) {

        return;

    }


    const currentValue =
        sessionSubject.value;


    sessionSubject.innerHTML =
        '<option value="">Select subject</option>';


    subjects.forEach(
        function(subject) {

            const option =
                document.createElement("option");

            option.value =
                subject.name;

            option.textContent =
                subject.name;


            sessionSubject.appendChild(
                option
            );

        }
    );


    if (
        subjects.some(
            function(subject) {

                return (
                    subject.name ===
                    currentValue
                );

            }
        )
    ) {

        sessionSubject.value =
            currentValue;

    }

}


// ============================================
// Save Study Session
// ============================================

if (saveSessionBtn) {

    saveSessionBtn.addEventListener(
        "click",
        function() {

            const subject =
                sessionSubject.value;

            const hours =
                Number(sessionHours.value);

            const date =
                sessionDate.value;


            if (!subject) {

                alert(
                    "Please select a subject."
                );

                return;

            }


            if (
                isNaN(hours) ||
                hours <= 0
            ) {

                alert(
                    "Please enter valid study hours."
                );

                return;

            }


            if (!date) {

                alert(
                    "Please select a study date."
                );

                return;

            }


            const sessions =
                JSON.parse(
                    localStorage.getItem(
                        "studySessions"
                    )
                ) || [];


            sessions.push({

                subject: subject,

                hours: hours,

                date: date

            });


            localStorage.setItem(
                "studySessions",
                JSON.stringify(sessions)
            );


            sessionHours.value = "";
            sessionDate.value =
                getTodayDate();


            displayStudyHistory();

            updateDashboard();

            updateWeeklyStatistics();

            updateAchievements();

        }
    );

}


// ============================================
// Display Study History
// ============================================

function displayStudyHistory() {

    if (!studyHistory) {

        return;

    }


    const sessions =
        JSON.parse(
            localStorage.getItem(
                "studySessions"
            )
        ) || [];


    studyHistory.innerHTML = "";


    if (sessions.length === 0) {

        studyHistory.innerHTML =
            "<p>No study sessions yet.</p>";

        return;

    }


    sessions
        .slice()
        .reverse()
        .forEach(
            function(session, reversedIndex) {

                const actualIndex =
                    sessions.length -
                    1 -
                    reversedIndex;


                const item =
                    document.createElement("div");

                item.className =
                    "study-session";


                let extraInfo = "";


                if (
                    session.type === "Quiz"
                ) {

                    extraInfo = `
                        <p>
                            🧠 Quiz:
                            ${session.topic || "Topic"}
                            <br>
                            Score:
                            ${session.score || 0}%
                        </p>
                    `;

                }


                item.innerHTML = `

                    <strong>
                        ${session.subject}
                    </strong>

                    <p>
                        ${session.hours}
                        hour(s)
                        on
                        ${session.date}
                    </p>

                    ${extraInfo}

                    <button
                        onclick="deleteStudySession(${actualIndex})"
                    >
                        Delete
                    </button>

                `;


                studyHistory.appendChild(
                    item
                );

            }
        );

}


// ============================================
// Delete Study Session
// ============================================

function deleteStudySession(index) {

    const sessions =
        JSON.parse(
            localStorage.getItem(
                "studySessions"
            )
        ) || [];


    const confirmed =
        confirm(
            "Delete this study session?"
        );


    if (!confirmed) {

        return;

    }


    sessions.splice(
        index,
        1
    );


    localStorage.setItem(
        "studySessions",
        JSON.stringify(sessions)
    );


    displayStudyHistory();

    updateDashboard();

    updateWeeklyStatistics();

    updateAchievements();

}


// ============================================
// Study Streak
// ============================================

function calculateStudyStreak() {

    const sessions =
        JSON.parse(
            localStorage.getItem(
                "studySessions"
            )
        ) || [];


    if (sessions.length === 0) {

        return 0;

    }


    const uniqueDates =
        [
            ...new Set(
                sessions.map(
                    function(session) {

                        return session.date;

                    }
                )
            )
        ]
        .sort()
        .reverse();


    const today =
        getTodayDate();


    if (
        uniqueDates[0] !==
        today
    ) {

        return 0;

    }


    let streak = 1;


    let currentDate =
        new Date(
            today +
            "T00:00:00"
        );


    for (
        let i = 1;
        i < uniqueDates.length;
        i++
    ) {

        currentDate.setDate(
            currentDate.getDate() - 1
        );


        const expectedDate =
            currentDate.getFullYear() +
            "-" +
            String(
                currentDate.getMonth() + 1
            ).padStart(2, "0") +
            "-" +
            String(
                currentDate.getDate()
            ).padStart(2, "0");


        if (
            uniqueDates[i] ===
            expectedDate
        ) {

            streak++;

        } else {

            break;

        }

    }


    return streak;

}


// ============================================
// Weekly Statistics
// ============================================

function updateWeeklyStatistics() {

    const sessions =
        JSON.parse(
            localStorage.getItem(
                "studySessions"
            )
        ) || [];


    const today =
        new Date();


    const lastSevenDays = [];


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date(today);


        date.setDate(
            today.getDate() - i
        );


        const dateString =
            date.getFullYear() +
            "-" +
            String(
                date.getMonth() + 1
            ).padStart(2, "0") +
            "-" +
            String(
                date.getDate()
            ).padStart(2, "0");


        lastSevenDays.push(
            dateString
        );

    }


    const weekly =
        sessions.filter(
            function(session) {

                return lastSevenDays.includes(
                    session.date
                );

            }
        );


    const totalHours =
        weekly.reduce(
            function(total, session) {

                return total +
                    Number(session.hours || 0);

            },
            0
        );


    if (weeklyStudyHours) {

        weeklyStudyHours.textContent =
            totalHours;

    }


    if (weeklySessions) {

        weeklySessions.textContent =
            weekly.length;

    }


    if (weeklyAverage) {

        if (weekly.length > 0) {

            weeklyAverage.textContent =
                (
                    totalHours /
                    weekly.length
                ).toFixed(1);

        } else {

            weeklyAverage.textContent =
                "0";

        }

    }


    const subjectHours = {};


    weekly.forEach(
        function(session) {

            if (
                !subjectHours[
                    session.subject
                ]
            ) {

                subjectHours[
                    session.subject
                ] = 0;

            }


            subjectHours[
                session.subject
            ] +=
                Number(session.hours || 0);

        }
    );


    let mostStudied =
        "None";

    let highestHours =
        0;


    Object.keys(
        subjectHours
    ).forEach(
        function(subject) {

            if (
                subjectHours[subject] >
                highestHours
            ) {

                highestHours =
                    subjectHours[subject];

                mostStudied =
                    subject;

            }

        }
    );


    if (mostStudiedSubject) {

        mostStudiedSubject.textContent =
            mostStudied;

    }


    // ========================================
    // Weekly Chart
    // ========================================

    const weeklyChart =
        document.getElementById(
            "weeklyChart"
        );


    if (!weeklyChart) {

        return;

    }


    weeklyChart.innerHTML = "";


    lastSevenDays.forEach(
        function(date) {

            const dayHours =
                weekly
                    .filter(
                        function(session) {

                            return (
                                session.date ===
                                date
                            );

                        }
                    )
                    .reduce(
                        function(total, session) {

                            return total +
                                Number(session.hours || 0);

                        },
                        0
                    );


            const dateObject =
                new Date(
                    date +
                    "T00:00:00"
                );


            const dayName =
                dateObject.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                );


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "chart-row";


            row.innerHTML = `

                <div class="chart-day">
                    ${dayName}
                </div>

                <div class="chart-bar-container">

                    <div
                        class="chart-bar"
                        style="width: ${Math.min(dayHours * 20, 100)}%"
                    ></div>

                </div>

                <div class="chart-hours">
                    ${dayHours}h
                </div>

            `;


            weeklyChart.appendChild(
                row
            );

        }
    );

}


// ============================================
// Achievements
// ============================================

function updateAchievements() {

    if (!achievements) {

        return;

    }


    const achievementItems =
        achievements.querySelectorAll(
            ".achievement"
        );


    achievementItems.forEach(
        function(item) {

            item.classList.remove(
                "unlocked"
            );

            item.classList.add(
                "locked"
            );

        }
    );


    const sessions =
        JSON.parse(
            localStorage.getItem(
                "studySessions"
            )
        ) || [];


    const totalHours =
        sessions.reduce(
            function(total, session) {

                return total +
                    Number(session.hours || 0);

            },
            0
        );


    const streak =
        calculateStudyStreak();


    const currentReadiness =
        calculateReadiness();


    const savedGoal =
        JSON.parse(
            localStorage.getItem(
                "studyGoal"
            )
        );


    // First Study Session

    if (
        sessions.length >= 1 &&
        achievementItems[0]
    ) {

        achievementItems[0].classList.remove(
            "locked"
        );

        achievementItems[0].classList.add(
            "unlocked"
        );

    }


    // 3-Day Streak

    if (
        streak >= 3 &&
        achievementItems[1]
    ) {

        achievementItems[1].classList.remove(
            "locked"
        );

        achievementItems[1].classList.add(
            "unlocked"
        );

    }


    // 10 Hours Studied

    if (
        totalHours >= 10 &&
        achievementItems[2]
    ) {

        achievementItems[2].classList.remove(
            "locked"
        );

        achievementItems[2].classList.add(
            "unlocked"
        );

    }


    // Goal Achiever

    if (
        savedGoal &&
        currentReadiness >=
            Number(savedGoal.target) &&
        achievementItems[3]
    ) {

        achievementItems[3].classList.remove(
            "locked"
        );

        achievementItems[3].classList.add(
            "unlocked"
        );

    }

}


// ============================================
// Revision Reminder
// ============================================

function updateRevisionReminder() {

    const revisionReminder =
        document.getElementById(
            "revisionReminder"
        );


    if (!revisionReminder) {

        return;

    }


    const weakSubjects =
        subjects.filter(
            function(subject) {

                return (
                    Number(subject.readiness) < 50
                );

            }
        );


    if (weakSubjects.length === 0) {

        revisionReminder.textContent =
            "No urgent revision needed. Keep up the good work! 🎉";

        return;

    }


    revisionReminder.textContent =
        weakSubjects.length +
        " subject(s) need revision.";

}


// ============================================
// Start Learning
// ============================================

const startLearningBtn =
    document.getElementById(
        "startLearningBtn"
    );


if (startLearningBtn) {

    startLearningBtn.addEventListener(
        "click",
        function() {

            const subjectsSection =
                document.getElementById(
                    "subjectsSection"
                );


            if (subjectsSection) {

                subjectsSection.scrollIntoView({

                    behavior: "smooth"

                });

            }

        }
    );

}


// ============================================
// Quiz → Readiness
// ============================================

function applyPendingQuizResult() {

    const pendingResult =
        localStorage.getItem(
            "pendingQuizResult"
        );


    if (!pendingResult) {

        return;

    }


    try {

        const result =
            JSON.parse(
                pendingResult
            );


        const quizSubject =
            result.subject;


        const quizPercentage =
            Number(
                result.percentage
            );


        const subject =
            subjects.find(
                function(item) {

                    return (
                        item.name.toLowerCase() ===
                        String(
                            quizSubject
                        ).toLowerCase()
                    );

                }
            );


        if (
            subject &&
            !isNaN(quizPercentage)
        ) {

            const oldReadiness =
                Number(
                    subject.readiness
                ) || 0;


            /*
                Combine the old readiness
                with the quiz score.
            */

            subject.readiness =
                Math.round(
                    (
                        oldReadiness +
                        quizPercentage
                    ) / 2
                );


            saveSubjects();


            localStorage.removeItem(
                "pendingQuizResult"
            );

        }

    } catch (error) {

        console.error(
            "Could not apply quiz result:",
            error
        );


        localStorage.removeItem(
            "pendingQuizResult"
        );

    }

}


// ============================================
// Save Everything and Re-render
// ============================================

function saveAndRender() {

    saveSubjects();

    renderSubjects();

    updateDashboard();

    updateAttentionTopics();

    updateSmartRevision();

    updateRevisionReminder();

    updateSessionSubjectOptions();

    updateWeeklyStatistics();

    updateAchievements();

    updateStudyGoal();

}


// ============================================
// Initial Page Load
// ============================================

applyPendingQuizResult();

renderSubjects();

updateDashboard();

updateAttentionTopics();

updateSmartRevision();

updateRevisionReminder();

updateSessionSubjectOptions();

updateWeeklyStatistics();

updateAchievements();

updateStudyGoal();

displayStudyHistory();


// ============================================
// Set Default Session Date
// ============================================

if (sessionDate) {

    if (!sessionDate.value) {

        sessionDate.value =
            getTodayDate();

    }

}
// ============================================
// Display Student Name
// ============================================

function displayStudentName() {

    const studentNameElement =
        document.getElementById("studentName");

    if (!studentNameElement) {
        return;
    }

    const savedProfile =
        localStorage.getItem("studentProfile");

    const savedStudent =
        localStorage.getItem("student");

    let name = "Student";

    if (savedProfile) {

        try {

            const profile =
                JSON.parse(savedProfile);

            if (profile.name) {
                name = profile.name;
            }

        } catch (error) {

            console.error(
                "Could not load student profile:",
                error
            );

        }

    }

    if (name === "Student" && savedStudent) {

        try {

            const student =
                JSON.parse(savedStudent);

            if (student.name) {
                name = student.name;
            }

        } catch (error) {

            console.error(
                "Could not load student:",
                error
            );

        }

    }

    studentNameElement.textContent = name;

}

displayStudentName();