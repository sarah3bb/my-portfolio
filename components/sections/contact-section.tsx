"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Send, Mic, MicOff, CalendarDays } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const [isRecording, setIsRecording] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMeetingSubmitting, setIsMeetingSubmitting] = useState(false)
  const [showMeetingForm, setShowMeetingForm] = useState(false)
  const [aiResponse, setAiResponse] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [meetingData, setMeetingData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  })

  const { toast } = useToast()

  const socials = [
    {
      name: "GitHub",
      icon: "🐙",
      color: "hover:text-gray-400",
      href: "https://github.com/sabb7296",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "hover:text-blue-400",
      href: "https://www.linkedin.com/in/sarah-abbas-b79907256",
    },
  ]

  const aiAnswers = {
  experience:
    "Sarah is a software developer with around 5 years of experience across startups and research-focused environments. She has worked in software engineering, DevOps, and systems operations roles, with experience improving workflows, automating processes, and supporting scalable cloud-based systems.",

  technologies:
    "Sarah works across full-stack and cloud technologies including React, TypeScript, Node.js, Python, AWS, Express, MongoDB, and serverless tools like Lambda and S3. She is also currently experimenting with Figma and Claude to explore design workflows and AI-assisted product development.",

  // projects:
  //   "Sarah has worked on projects including an AWS-based image captioning web app, a full-stack e-commerce platform, machine learning prediction models, and QA and systems improvement work across startup and research environments.",
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      toast({
        title: "Message sent! 🚀",
        description: "Thanks for reaching out. I'll get back to you soon!",
      })

      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "Your message could not be sent.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMeetingRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsMeetingSubmitting(true)

    try {
      const response = await fetch("/api/meeting-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetingData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send meeting request")
      }

      toast({
        title: "Meeting request sent 📅",
        description: "Thanks! Sarah will review your preferred time and get back to you soon.",
      })

      setMeetingData({
        name: "",
        email: "",
        date: "",
        time: "",
        notes: "",
      })
      setShowMeetingForm(false)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "Your meeting request could not be sent.",
        variant: "destructive",
      })
    } finally {
      setIsMeetingSubmitting(false)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      toast({
        title: "Voice input activated 🎤",
        description: "Speak your message and I'll transcribe it for you!",
      })
    }
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">
            Let's Connect
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  💬 Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="glass-morphism border-white/20 text-white placeholder:text-white/50 min-h-32"
                      required
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={toggleRecording}
                      className={`absolute top-2 right-2 ${
                        isRecording ? "text-red-400 animate-pulse" : "text-white/60"
                      }`}
                    >
                      {isRecording ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 hover:animate-glow"
                    size="lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  📞 Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span className="text-white/80">sarahabbas270@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="text-white/80">+61 410 868 613</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <span className="text-white/80">Sydney, NSW</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  🤖 AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-sm">
                      AI
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm">
                        Hi! I'm Sarah's AI assistant. I can help answer questions about her experience, schedule
                        meetings, or provide project details. What would you like to know?
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white cursor-pointer hover:bg-white/20"
                      onClick={() => {
                        setAiResponse(aiAnswers.experience)
                        setShowMeetingForm(false)
                      }}
                    >
                      Tell me about Sarah's experience
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white cursor-pointer hover:bg-white/20"
                      onClick={() => {
                        setAiResponse(aiAnswers.technologies)
                        setShowMeetingForm(false)
                      }}
                    >
                      What technologies does she use?
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white cursor-pointer hover:bg-white/20"
                      onClick={() => {
                        setAiResponse("")
                        setShowMeetingForm((prev) => !prev)
                      }}
                    >
                      Schedule a meeting
                    </Badge>
                  </div>

                  {aiResponse && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-sm">
                          AI
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">{aiResponse}</p>
                      </div>
                    </div>
                  )}
                  {showMeetingForm && (
                    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <CalendarDays className="h-5 w-5 text-cyan-400" />
                        <h3 className="text-white font-semibold">Request a Meeting</h3>
                      </div>

                      <form onSubmit={handleMeetingRequest} className="space-y-4">
                        <Input
                          placeholder="Your Name"
                          value={meetingData.name}
                          onChange={(e) =>
                            setMeetingData({ ...meetingData, name: e.target.value })
                          }
                          className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                          required
                        />

                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={meetingData.email}
                          onChange={(e) =>
                            setMeetingData({ ...meetingData, email: e.target.value })
                          }
                          className="glass-morphism border-white/20 text-white placeholder:text-white/50"
                          required
                        />

                        <Input
                          type="date"
                          value={meetingData.date}
                          onChange={(e) =>
                            setMeetingData({ ...meetingData, date: e.target.value })
                          }
                          className="glass-morphism border-white/20 text-white"
                          required
                        />

                        <Input
                          type="time"
                          value={meetingData.time}
                          onChange={(e) =>
                            setMeetingData({ ...meetingData, time: e.target.value })
                          }
                          className="glass-morphism border-white/20 text-white"
                          required
                        />

                        <Textarea
                          placeholder="What would you like to discuss?"
                          value={meetingData.notes}
                          onChange={(e) =>
                            setMeetingData({ ...meetingData, notes: e.target.value })
                          }
                          className="glass-morphism border-white/20 text-white placeholder:text-white/50 min-h-24"
                        />

                        <Button
                          type="submit"
                          disabled={isMeetingSubmitting}
                          className="w-full glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                        >
                          {isMeetingSubmitting ? "Sending Request..." : "Request to Schedule"}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  🌐 Connect Online
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socials.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 p-3 rounded-lg glass-morphism border border-white/10 text-white/80 transition-colors ${social.color}`}
                    >
                      <span className="text-lg">{social.icon}</span>
                      <span>{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60">© 2026 Sarah Abbas. Crafted with ❤️ and cutting-edge tech.</div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
              <span className="text-white/40 text-sm">Powered by Next.js & Three.js</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}