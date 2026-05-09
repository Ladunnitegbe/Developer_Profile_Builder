const developers = [
 {
   id: 1,
   name: "Amara Johnson",
   track: "Frontend",
   skills: ["HTML", "CSS", "JavaScript", "React"],
   projects: { completed: 8, ongoing: 2 },
   isAvailable: true,
   mentor: { name: "Sarah Chen", specialty: "React" }
 },
 {
   id: 2,
   name: "Chidi Okafor",
   track: "Backend",
   skills: ["Python", "Django", "SQL"],
   projects: { completed: 5, ongoing: 3 },
   isAvailable: false,
   mentor: { name: "James Udo", specialty: "System Design" }
 },
 {
   id: 3,
   name: "Fatima Hassan",
   track: "Frontend",
   skills: ["HTML", "CSS", "JavaScript", "Vue", "TypeScript"],
   projects: { completed: 10, ongoing: 1 },
   isAvailable: true,
   mentor: null
 },
 {
   id: 4,
   name: "Emeka Nwosu",
   track: "Mobile",
   skills: ["Dart", "Flutter"],
   projects: { completed: 3, ongoing: 1 },
   isAvailable: true,
   mentor: { name: "Femi Adeyemi", specialty: "Mobile Architecture" }
 },
 {
   id: 5,
   name: "Zara Ahmed",
   track: "Backend",
   skills: ["Node.js", "Express", "MongoDB", "GraphQL"],
   projects: { completed: 7, ongoing: 2 },
   isAvailable: true,
   mentor: null
 },
 {
   id: 6,
   name: "Grace Eze",
   track: "Frontend",
   skills: [],
   projects: { completed: 0, ongoing: 0 },
   isAvailable: false,
   mentor: { name: "Sarah Chen", specialty: "React" }
 }
];

// Step 1: Profile Cards
// Create a function called `buildProfileCard` that takes a developer object and returns a formatted string.

const buildProfileCard = ({name, track, skills, projects:{completed, ongoing}, isAvailable, mentor}) => {

const availability = isAvailable ? "Available" : "Not Available";
const mentorAssigned = mentor?.name ?? "No mentor assigned";
const skillsAcquired = skills.length > 0 ? skills.join(", ") : "No skills listed yet";

return `
Profile card
Name: ${name}
Track: ${track}
Skills: ${skillsAcquired}
Projects: Completed: ${completed}, Ongoing: ${ongoing}
Avialability: ${availability}
Mentor: ${mentorAssigned}
`;
};

developers.map((developers) => {
    console.log (buildProfileCard(developers));
});


// Step 2: Unique Skills Pool
// Collect ALL skills from ALL developers into one array, then remove duplicates.

const skills = [
    ...new Set(
            developers.flatMap((list) =>
            list.skills
                )
            )].sort();
 console.log(skills);

// Step 3: Track Summary
// Generate a summary for each track showing: number of developers, number available, and total projects completed.

const track = [
     ...new Set(
                    developers.map((dev) =>
                    dev.track
                    )
    )];

const trackStats = track.map((track) => {
 const devsPerTrack = developers.filter(
        (dev) => dev.track === track
    );

    const totalProjects = devsPerTrack.reduce(
        (sum, dev) => sum + dev.projects.completed, 0
    );

    return {
        track,
        totalDevelopers: devsPerTrack.length,
        totalProjects
    };
}
   );

console.log(
  trackStats.map((stat) => `
            Track: ${stat.track}
            Developers: ${stat.totalDevelopers}
            Total Projects: ${stat.totalProjects}
    `).join("\n")
);

//  Step 4: Add a New Developer
// Write a function called `addDeveloper` that:
// Takes the current developers array and a new developer object
// Returns a new array with the new developer added (uses spread `[...array, newItem]`)
// Does NOT mutate the original array
// Create a new developer object:
// Log the original array length and the new array length to prove immutability.


const addDeveloper = (developers, newDeveloper) => {
  const newDevelopersArray = [...developers, newDeveloper];

  console.log("Original length:", developers.length);
  console.log("New length:", newDevelopersArray.length);

  return newDevelopersArray;
};

const newDeveloper = {

  id: 7,
   name: "Ada Jackson",
   track: "Frontend",
   skills: [],
   projects: { completed: 1, ongoing: 0 },
   isAvailable: false,
   mentor: null
};

const addedDevelopers = addDeveloper(developers, newDeveloper);

console.log(addedDevelopers);


// Step 5: Update a Developer
// Write a function called `updateDeveloper` that:
// Takes the developers array, an `id`, and an `updates` object
// Returns a **new array** where the matching developer's data is merged with the updates
// Uses `.map()` and spread `{ ...developer, ...updates }` to merge
// Does NOT mutate the original array or original developer objects
// Update Emeka (id: 4) to add new skills and change availability:
// Log the updated developer to show the merge worked.

const updateDeveloper = (developers, id, updates) => {
  return developers.map((developer) =>
    developer.id === id
      ? { ...developer, ...updates }
      : developer
  );
};


const emekaUpdates = {
  skills: ["Node.js", "Express", "MongoDB"],
  isAvailable: false
};

const updatedDevelopers = updateDeveloper(developers, 4, emekaUpdates);


const updatedEmeka = updatedDevelopers.find(
  (dev) => dev.id === 4
);


console.log("Updated Developers List:");
console.log(updatedDevelopers);

console.log("\nUpdated Emeka:");
console.log(updatedEmeka)


// Step 6: Mentor Workload
// Calculate how many developers each mentor has. Handle the `null` mentor case.
 
 
const mentorStats = developers.reduce((accumulator, dev) => {
    const mentorName = dev.mentor?.name ?? "Unassigned";
    accumulator[mentorName] = (accumulator[mentorName] || 0) + 1;

    return accumulator;
}, {});

console.log(mentorStats);

// // Step 7: Experience Ranking
// // Rank developers by total projects (completed + ongoing), highest first.

const developersNew = [...developers];

developersNew.sort(({ projects: a }, { projects: b }) => {
  const totalA = a.completed + a.ongoing;
  const totalB = b.completed + b.ongoing;

  return totalB - totalA;
});

const ranked = developersNew.map((dev, index) => {
  const total =
    dev.projects.completed + dev.projects.ongoing;

  const medal =
    index === 0
      ? "🥇"
      : index === 1
      ? "🥈"
      : index === 2
      ? "🥉"
      : "";

  return `
${index + 1}. ${medal} ${dev.name} - ${total} projects
`;
});

console.log(ranked.join("\n"));

