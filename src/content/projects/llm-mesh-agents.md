---
title: "Safe Agents Workspace"
shortTitle: "A self-hosted assistant for colleagues."
category: "AI agents / Self-hosted workspace"
summary: "A corporate assistant that brings chat and project files together with Hermes agents in Docker Sandboxes."
role: "Developer"
context: "Corporate AI assistant"
order: 4
kind: "agents"
technologies: ["Docker Sandboxes", "Hermes", "Self-hosted AI", "Linux"]
focus: ["Chat and documents", "Isolated agent runtime", "Self-hosting"]
---
## My contribution

I built this workspace as a corporate AI assistant for colleagues. It brings chat and project files together, while Hermes agents run in Docker Sandboxes: isolated microVMs with configurable file mounts and network access.

The public, anonymized version contains one generic assistant profile and synthetic demo conversations. It is available on [GitHub](https://github.com/OlegQm/agent-workspace).

The documented setup targets Ubuntu 24.04 on x86_64. Local Docker Sandboxes need KVM hardware virtualization and an account allowed to use it (`kvm` group); a virtual-machine host also needs nested virtualization. This setup gives each agent sandbox 8 GB of RAM and four CPU cores, in addition to the web application and operating system. Raspberry Pi 4 and newer are not validated: an ARM64 host also needs working KVM and a compatible Hermes sandbox image. Until those are verified, run agents on the documented x86_64 host.

## Interface walkthrough

The gallery shows the application interface with fictional conversations and workspace documents, including desktop and mobile layouts, the file drawer, and a read-only document preview. All conversation and document content shown here is synthetic demo data.
