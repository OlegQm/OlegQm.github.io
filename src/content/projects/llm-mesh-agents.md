---
title: "Safe Agents Workspace"
shortTitle: "A self-hosted AI workspace for colleagues."
category: "AI agents / Self-hosted workspace"
summary: "A corporate AI assistant for colleagues, combining chat, documents and isolated Hermes agents."
role: "Developer"
context: "Corporate AI assistant"
order: 4
kind: "agents"
technologies: ["Docker Sandboxes", "Hermes", "Self-hosted AI", "Linux"]
focus: ["Chat and documents", "Isolated agent runtime", "Self-hosting"]
---
## My contribution

Created as a corporate AI assistant for colleagues, this workspace brings chat and project documents into one self-hosted application. Hermes agents handle requests inside Docker Sandboxes, which provide isolated microVMs; each deployment defines which workspace files are mounted and what network access is allowed.

The public, anonymized version contains one generic assistant profile and synthetic demo conversations. It is available on [GitHub](https://github.com/OlegQm/agent-workspace).

Self-hosting requires a supported 64-bit Linux host with KVM enabled for local Docker Sandboxes. The documented deployment targets Ubuntu 24.04 on x86_64 and allocates 8 GB RAM and four CPU cores per agent sandbox, in addition to the web application and operating system. Raspberry Pi 4 or newer is not validated by this deployment: an ARM64 setup also needs working KVM and a compatible Hermes sandbox image. Use a compatible runtime host for agents unless those ARM requirements are verified.

## Interface walkthrough

The gallery shows the application interface with fictional conversations and workspace documents, including desktop and mobile layouts, the file drawer, and a read-only document preview. All conversation and document content shown here is synthetic demo data.
