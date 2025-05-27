import { Injectable } from "@nestjs/common"

@Injectable()
export class SocialUtilsService {
  private platformConfigs = {
    linkedin: {
      name: "LinkedIn",
      baseUrl: "https://linkedin.com",
      iconClass: "fab fa-linkedin",
      color: "#0077B5",
      urlPattern: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    github: {
      name: "GitHub",
      baseUrl: "https://github.com",
      iconClass: "fab fa-github",
      color: "#333333",
      urlPattern: /^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    twitter: {
      name: "Twitter",
      baseUrl: "https://twitter.com",
      iconClass: "fab fa-twitter",
      color: "#1DA1F2",
      urlPattern: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    instagram: {
      name: "Instagram",
      baseUrl: "https://instagram.com",
      iconClass: "fab fa-instagram",
      color: "#E4405F",
      urlPattern: /^https?:\/\/(www\.)?instagram\.com\/[\w.-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    facebook: {
      name: "Facebook",
      baseUrl: "https://facebook.com",
      iconClass: "fab fa-facebook",
      color: "#1877F2",
      urlPattern: /^https?:\/\/(www\.)?facebook\.com\/[\w.-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    youtube: {
      name: "YouTube",
      baseUrl: "https://youtube.com",
      iconClass: "fab fa-youtube",
      color: "#FF0000",
      urlPattern: /^https?:\/\/(www\.)?youtube\.com\/(channel|c|user)\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    dribbble: {
      name: "Dribbble",
      baseUrl: "https://dribbble.com",
      iconClass: "fab fa-dribbble",
      color: "#EA4C89",
      urlPattern: /^https?:\/\/(www\.)?dribbble\.com\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    behance: {
      name: "Behance",
      baseUrl: "https://behance.net",
      iconClass: "fab fa-behance",
      color: "#1769FF",
      urlPattern: /^https?:\/\/(www\.)?behance\.net\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    medium: {
      name: "Medium",
      baseUrl: "https://medium.com",
      iconClass: "fab fa-medium",
      color: "#00AB6C",
      urlPattern: /^https?:\/\/(www\.)?medium\.com\/@?[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("@", "").replace("/", ""),
    },
    dev: {
      name: "DEV Community",
      baseUrl: "https://dev.to",
      iconClass: "fab fa-dev",
      color: "#0A0A0A",
      urlPattern: /^https?:\/\/(www\.)?dev\.to\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    stackoverflow: {
      name: "Stack Overflow",
      baseUrl: "https://stackoverflow.com",
      iconClass: "fab fa-stack-overflow",
      color: "#F58025",
      urlPattern: /^https?:\/\/(www\.)?stackoverflow\.com\/users\/[\d]+\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => {
        const match = url.match(/\/users\/\d+\/([\w-]+)/)
        return match ? match[1] : null
      },
    },
    codepen: {
      name: "CodePen",
      baseUrl: "https://codepen.io",
      iconClass: "fab fa-codepen",
      color: "#000000",
      urlPattern: /^https?:\/\/(www\.)?codepen\.io\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    discord: {
      name: "Discord",
      baseUrl: "https://discord.com",
      iconClass: "fab fa-discord",
      color: "#5865F2",
      urlPattern: /^https?:\/\/(www\.)?discord\.(gg|com)\/[\w-]+\/?$/,
      usernameExtractor: (url: string) => url.split("/").pop()?.replace("/", ""),
    },
    website: {
      name: "Website",
      baseUrl: "",
      iconClass: "fas fa-globe",
      color: "#6B7280",
      urlPattern: /^https?:\/\/[\w.-]+\/?.*$/,
      usernameExtractor: (url: string) => {
        try {
          return new URL(url).hostname
        } catch {
          return null
        }
      },
    },
    blog: {
      name: "Blog",
      baseUrl: "",
      iconClass: "fas fa-blog",
      color: "#6B7280",
      urlPattern: /^https?:\/\/[\w.-]+\/?.*$/,
      usernameExtractor: (url: string) => {
        try {
          return new URL(url).hostname
        } catch {
          return null
        }
      },
    },
    other: {
      name: "Other",
      baseUrl: "",
      iconClass: "fas fa-link",
      color: "#6B7280",
      urlPattern: /^https?:\/\/[\w.-]+\/?.*$/,
      usernameExtractor: (url: string) => {
        try {
          return new URL(url).hostname
        } catch {
          return null
        }
      },
    },
  }

  getPlatformConfig(platform: string) {
    return this.platformConfigs[platform] || this.platformConfigs.other
  }

  validateUrl(platform: string, url: string): boolean {
    const config = this.getPlatformConfig(platform)
    return config.urlPattern.test(url)
  }

  extractUsername(platform: string, url: string): string | null {
    const config = this.getPlatformConfig(platform)
    return config.usernameExtractor(url)
  }

  generateProfileUrl(platform: string, username: string): string {
    const config = this.getPlatformConfig(platform)

    switch (platform) {
      case "linkedin":
        return `${config.baseUrl}/in/${username}`
      case "github":
        return `${config.baseUrl}/${username}`
      case "twitter":
        return `${config.baseUrl}/${username}`
      case "instagram":
        return `${config.baseUrl}/${username}`
      case "facebook":
        return `${config.baseUrl}/${username}`
      case "youtube":
        return `${config.baseUrl}/c/${username}`
      case "dribbble":
        return `${config.baseUrl}/${username}`
      case "behance":
        return `${config.baseUrl}/${username}`
      case "medium":
        return `${config.baseUrl}/@${username}`
      case "dev":
        return `${config.baseUrl}/${username}`
      case "codepen":
        return `${config.baseUrl}/${username}`
      default:
        return username
    }
  }

  getAllPlatforms() {
    return Object.keys(this.platformConfigs).map((key) => ({
      key,
      ...this.platformConfigs[key],
    }))
  }

  getSocialMediaCategories() {
    return {
      professional: ["linkedin", "github", "stackoverflow", "medium", "dev"],
      social: ["twitter", "instagram", "facebook", "discord", "telegram"],
      creative: ["dribbble", "behance", "codepen", "youtube"],
      entertainment: ["tiktok", "snapchat", "twitch", "spotify", "pinterest"],
      communication: ["whatsapp", "telegram", "discord"],
      other: ["website", "blog", "other"],
    }
  }

  formatSocialLink(socialLink: any) {
    const config = this.getPlatformConfig(socialLink.platform)

    return {
      ...socialLink,
      platformName: config.name,
      iconClass: config.iconClass,
      color: config.color,
      isValidUrl: this.validateUrl(socialLink.platform, socialLink.url),
      extractedUsername: this.extractUsername(socialLink.platform, socialLink.url),
    }
  }

  generateSocialMetaTags(socialLinks: any[]) {
    const metaTags = []

    socialLinks.forEach((link) => {
      if (link.platform === "twitter" && link.isActive) {
        metaTags.push({
          name: "twitter:site",
          content: `@${link.username}`,
        })
      }

      if (link.platform === "facebook" && link.isActive) {
        metaTags.push({
          property: "og:url",
          content: link.url,
        })
      }
    })

    return metaTags
  }

  generateStructuredData(socialLinks: any[], personData: any) {
    const sameAs = socialLinks.filter((link) => link.isActive).map((link) => link.url)

    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personData.name,
      url: personData.website,
      sameAs,
      jobTitle: personData.jobTitle,
      worksFor: {
        "@type": "Organization",
        name: personData.company,
      },
    }
  }
}
