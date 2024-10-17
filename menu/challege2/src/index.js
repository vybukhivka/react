import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="https://i1.sndcdn.com/avatars-wxWatrQnDcRYRWR7-fCdT0Q-t500x500.jpg" />
}

function Intro() {
  return (
    <div>
      <h1>Victor Bakhovka</h1>
      <p>
        Frontend developer, with a solid JavaScript knowladge.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skill={skill.skill} color={skill.color} level={skill.level} key={skill.skill} />
      ))}
    </div>
  );
}

function Skill({skill, color, level}) {
  return (
    <div 
      className="skill" 
      style={{ backgroundColor: color}}
    >
      <span>{skill}</span>
      <span>
        {level === 'advanced' && '💪'}
        {level === 'intermediate' && '💨'}
        {level === 'beginner' && '👶'}
      </span>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
