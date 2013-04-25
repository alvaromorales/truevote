# An election is defined here

class Election:
    RACES = [
        "President and Vice President",
        "Senator in Congress",
        "Representative in Congress",
        "Councillor",
        "Senator in General Court",
        "Representative in General Court",
        "Clerk of Courts",
        "Register of Deeds"
        ]

    CANDIDATES = {
        "President and Vice President": {
                "Obama and Biden" : "Democratic Party",
                "Romney and Ryan" : "Republican Party",
                "Johnson and Gray" : "Libertarian Party",
                "Stein and Honkala" : "Green-Rainbow Party"
                },
        "Senator in Congress": {
            "Elizabeth Warren" : "Democratic Party",
            "Scott Brown" : "Republican Party",
            },
        "Representative in Congress": {
            "Nicola Tsongas" : "Democratic Party",
            "Jonathan Golnik" : "Republican Party"
            },
        "Councillor": {
            "Marilyn Devaney" : "Democratic Party",
            "Thomas Sheff" : "Unenrolled Party"
            },
        "Senator in General Court": {
            "Michael Barrett" : "Democratic Party",
            "Sandi Martinez" : "Republican Party"
            },
        "Representative in General Court": {
            "Cory Atkins" : "Democratic Party",
            "Michael Benn" : "Republican Party"
            },
        "Clerk of Courts": {
            "Michael Sullivan" : "Democratic Party"
            },
        "Register of Deeds": {
            "Maria Curtatone" : "Democratic Party"
            }
        }
    
    def getCandidates(counter):
        pass
