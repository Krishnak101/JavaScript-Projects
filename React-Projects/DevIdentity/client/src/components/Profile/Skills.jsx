import "./Skills.css";
import { useSelector } from "react-redux";
import Spinner from "../Home/Spinner";

const Skills = ({ skills }) => {
  const { profile, isProfileLoaded } = useSelector((state) => state.profile);
  const skillList = [
    // Frontend
    { name: "HTML", icon: "fa-brands fa-html5", color: "#E34F26" },
    { name: "CSS", icon: "fa-brands fa-css3-alt", color: "#1572B6" },
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E" },
    { name: "TypeScript", icon: "fa-solid fa-code", color: "#3178C6" },
    { name: "React", icon: "fa-brands fa-react", color: "#61DAFB" },
    {
      name: "Reduxjs Toolkit",
      icon: "fa-solid fa-layer-group",
      color: "#764ABC",
    }, // Generic icon
    { name: "TailwindCSS", icon: "fa-solid fa-wind", color: "#06B6D4" },
    { name: "BootStrap", icon: "fa-brands fa-bootstrap", color: "#7952B3" },

    // Backend & Databases
    { name: "Nodejs", icon: "fa-brands fa-node-js", color: "#339933" },
    { name: "Express.js", icon: "fa-solid fa-server", color: "#000000" },
    { name: "Java", icon: "fa-brands fa-java", color: "#007396" },
    { name: "Python", icon: "fa-brands fa-python", color: "#3776AB" },
    { name: "SpringBoot", icon: "fa-solid fa-leaf", color: "#6DB33F" },
    { name: "Hibernate", icon: "fa-solid fa-database", color: "#59666C" },
    { name: "Maven", icon: "fa-solid fa-cogs", color: "#C71A36" },
    { name: "SQL", icon: "fa-solid fa-database", color: "#4479A1" },
    { name: "PostgreSQL", icon: "fa-solid fa-database", color: "#336791" },
    { name: "MongoDB", icon: "fa-solid fa-envira", color: "#47A248" },

    // DevOps & Cloud
    { name: "Docker", icon: "fa-brands fa-docker", color: "#2496ED" },
    { name: "Kubernetes", icon: "fa-solid fa-dharmachakra", color: "#326CE5" },
    { name: "Terraform", icon: "fa-solid fa-cloud-sun", color: "#623CE4" },
    { name: "AWS", icon: "fa-brands fa-aws", color: "#FF9900" },
    { name: "Postman", icon: "fa-solid fa-rocket", color: "#FF6C37" },

    // Systems & Tools
    { name: "Linux", icon: "fa-brands fa-linux", color: "#FCC624" },
    { name: "Windows", icon: "fa-brands fa-windows", color: "#0078D6" },
    { name: "Virtual Machines", icon: "fa-solid fa-desktop", color: "#212121" },
    {
      name: "Operating Systems",
      icon: "fa-solid fa-microchip",
      color: "#4B8BBE",
    },
    { name: "Bash", icon: "fa-solid fa-terminal", color: "#4EAA25" },
    { name: "DSA", icon: "fa-solid fa-code-branch", color: "#000000" },
    { name: "Git", icon: "fa-brands fa-github", color: "#000000" },

    // Additional Skills
    { name: "Ansible", icon: "fa-solid fa-gears", color: "#EE0000" },
    { name: "Dynamo DB", icon: "fa-solid fa-bolt", color: "#4053D6" },
    { name: "MVC", icon: "fa-solid fa-diagram-project", color: "#F26522" },
    { name: "Hadoop", icon: "fa-solid fa-elephant", color: "#FFFF00" }, // Note: fa-elephant requires FA 6+
    { name: "Next.js", icon: "fa-solid fa-n", color: "#000000" },
    { name: "Flask", icon: "fa-solid fa-flask", color: "#000000" },
    { name: "Power BI", icon: "fa-solid fa-chart-bar", color: "#F2C811" },
    { name: "Google ADK", icon: "fa-brands fa-android", color: "#3DDC84" },
    { name: "Artificial Intelligence", icon: "fa-solid fa-brain", color: "#00A2FF" },
    { name: "Excel", icon: "fa-solid fa-file-excel", color: "#1D6F42" },

    // Essential Industry Tools
    { name: "Jenkins", icon: "fa-brands fa-jenkins", color: "#D24939" },
    { name: "Firebase", icon: "fa-solid fa-fire", color: "#FFCA28" },
    { name: "GraphQL", icon: "fa-solid fa-circle-nodes", color: "#E10098" },
    { name: "Jira", icon: "fa-brands fa-jira", color: "#0052CC" },
    { name: "Figma", icon: "fa-brands fa-figma", color: "#F24E1E" },
    { name: "Redis", icon: "fa-solid fa-box-archive", color: "#DC382D" },
    { name: "Azure", icon: "fa-brands fa-microsoft", color: "#0078D4" }
  ];

  if (!isProfileLoaded) {
    return <Spinner />;
  }
  if (!profile) {
    return <p className="text-center text-gray-500">No Skills added yet.</p>;
  }

  return (
    <section className="skills_top_container bg-gray-700/40 rounded-lg border-2 border-gray-500/40">
      <h2 className="text-white text-2xl font-bold mb-12 ml-4">Skills</h2>
      <br />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-6">
        {skills.map((skillName, index) => {
          // Search for the skill metadata in our local skillList array
          const skillData = skillList.find(
            (s) => s.name.toLowerCase() === skillName.toLowerCase(),
          );

          return (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white p-3 rounded-xl shadow-md transform transition-transform hover:scale-110"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                <i
                  className={`${
                    skillData ? skillData.icon : "fa-solid fa-code"
                  } text-xl`}
                  style={{ color: skillData ? skillData.color : "#3b82f6" }}
                ></i>
              </div>
              <span className="text-black font-bold text-sm">{skillName}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
