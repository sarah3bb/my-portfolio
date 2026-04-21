"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { Card, CardContent } from "@/components/ui/card"

const skillsData = [
  {
    name: "Python",
    category: "Languages",
    color: "#3776AB",
    position: [5.2, 0, 0],
    description: "Automation, data analysis, backend scripting, and machine learning workflows.",
  },
  {
    name: "Java",
    category: "Languages",
    color: "#f89820",
    position: [3.68, 3.68, 0],
    description: "Object-oriented programming, backend logic, and software engineering projects.",
  },
  {
    name: "JavaScript",
    category: "Languages",
    color: "#F7DF1E",
    position: [0, 3.2, 0],
    description: "Dynamic web development across frontend and full-stack applications.",
  },
  {
    name: "SQL",
    category: "Languages",
    color: "#d271f2",
    position: [-3.68, 3.68, 0],
    description: "Database querying, structured data handling, and backend data workflows.",
  },
  {
    name: "AWS",
    category: "Cloud & DevOps",
    color: "#fab856",
    position: [-5.2, 0, 0],
    description: "EC2, S3, RDS, Lambda, IAM, VPC, and CloudWatch for cloud systems.",
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    color: "#2496ED",
    position: [-3.68, -2.68, 0],
    description: "Containerization and deployment of modern applications.",
  },
  {
    name: "Linux",
    category: "Cloud & DevOps",
    color: "#ffd044",
    position: [0, -5.2, 0],
    description: "Command-line operations, scripting, and environment management.",
  },
  {
    name: "Jenkins",
    category: "Cloud & DevOps",
    color: "#fc32c9",
    position: [3.68, -2.68, 0],
    description: "CI/CD pipelines and automated build, test, and integration workflows.",
  },
  {
    name: "React",
    category: "Web Dev",
    color: "#61DAFB",
    position: [2.6, 0, 2.2],
    description: "Component-based frontend development for interactive web applications.",
  },
  {
    name: "TypeScript",
    category: "Web Dev",
    color: "#1c85f6",
    position: [1.3, 2.25, 2.2],
    description: "Type-safe frontend and backend development with cleaner maintainable code.",
  },
  {
    name: "Flask",
    category: "Web Dev",
    color: "#9affff",
    position: [-1.3, 2.25, 2.2],
    description: "Python backend services and API development.",
  },
  {
    name: "REST APIs",
    category: "Web Dev",
    color: "#00C7B7",
    position: [-2.6, 0, 2.2],
    description: "Design and implementation of scalable API endpoints and integrations.",
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    color: "#F05032",
    position: [-1.3, -1.25, 2.2],
    description: "Version control, branching, pull requests, and collaborative development.",
  },
  {
    name: "Postman",
    category: "Tools",
    color: "#ffb237",
    position: [1.3, -1.25, 2.2],
    description: "API testing, request debugging, and workflow validation.",
  },
]

function SkillOrb({ skill, onClick, isHovered }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      if (isHovered) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  // const size = (skill.level / 100) * 0.6 + 0.2
  const size = 0.5

  return (
    <group position={skill.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 0.2 : 0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      <Text position={[0, -size - 0.4, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
        {skill.name}
      </Text>

      <Text position={[0, -size - 0.6, 0]} fontSize={0.12} color="#888" anchorX="center" anchorY="middle">
        {skill.level}
      </Text>
    </group>
  )
}

// Fallback 2D skills grid
function FallbackSkillsGrid({ skills, onSkillClick }: any) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill: any) => (
        <motion.div
          key={skill.name}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSkillClick(skill)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: skill.color + "20", color: skill.color }}
              >
                {skill.level}%
              </div>
              <h3 className="text-white font-semibold mb-1">{skill.name}</h3>
              <p className="text-white/60 text-sm">{skill.category}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default function SkillWheel() {
  const [hoveredSkill, setHoveredSkill] = useState<any>(null)
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  const handleCanvasError = () => {
    setCanvasError(true)
    setWebglSupported(false)
  }

  return (
    <div className="relative w-full h-full">
      {webglSupported && !canvasError ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          onError={handleCanvasError}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {skillsData.map((skill) => (
            <SkillOrb
              key={skill.name}
              skill={skill}
              isHovered={hoveredSkill?.name === skill.name}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={false} enableRotate={true} maxDistance={8} minDistance={4} />
        </Canvas>
      ) : (
        <FallbackSkillsGrid skills={skillsData} onSkillClick={setSelectedSkill} />
      )}

      {/* Skill Details */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 glass-morphism rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
              <button onClick={() => setSelectedSkill(null)} className="text-white/60 hover:text-white">
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">{selectedSkill.category}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  />
                </div>
                <span className="text-white/80">{selectedSkill.level}%</span>
              </div>
            </div>

            <p className="text-white/70">{selectedSkill.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
