
export function getSponsors(count: number): Sponsor[] {
    const sponsors = {}

    for (let i = 1; i <= count; i++) {
        const sponsor = getSponsor(i)
        if (!sponsors[sponsor.Group]) sponsors[sponsor.Group] = []
        sponsors[sponsor.Group].push(getSponsor(i))
    }

    return sponsors
}

function getSponsor(id: number): Sponsor {
    const env = getSponsorEnvs()
    const re = /[0-9]+/

    const sponsor = {}

    for (let key in env) {
        if (re.exec(key)[0] == id) {
            if (key.includes("NAME")) {
                sponsor.Name = env[key]
            }
            if (key.includes("LOGO_URL")) {
                sponsor.LogoURL = env[key]
            }
            if (key.includes("GROUP")) {
                sponsor.Group = env[key]
            }
        }
    }

    return sponsor
}

function getSponsorEnvs() {
    const env = {}
    for (let key in process.env) {
        if (key.includes('SPONSOR')) {
            env[key] = process.env[key]
        }
    }

    return env
}