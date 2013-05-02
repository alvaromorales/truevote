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
        "President and Vice President": [
            {
                "name": "Obama and Biden" ,
                "party" : "Democratic Party"
                },
            {
                "name": "Romney and Ryan" ,
                "party" : "Republican Party"
                },
            {
                "name": "Johnson and Gray" ,
                "party" : "Libertarian Party"
                },
            {
                "name": "Stein and Honkala" ,
                "party" : "Green-Rainbow Party"
                }
            ],
        "Senator in Congress": [
            {
                "name": "Elizabeth Warren" ,
                "party" : "Democratic Party"
                },
            {
                "name": "Scott Brown" ,
                "party" : "Republican Party"
                }
            ],
        "Representative in Congress": [
            {
                "name": "Nicola Tsongas" ,
                "party" : "Democratic Party"
                },
            {
                "name": "Jonathan Golnik" ,
                "party" : "Republican Party"
                }
            ],
        "Councillor": [
            {
                "name": "Marilyn Devaney" ,
                "party" : "Democratic Party"
                },
            {
                "name": "Thomas Sheff" ,
                "party" : "Unenrolled Party"
                }
            ],
        "Senator in General Court": [
            {
                "name": "Michael Barrett" ,
                "party" : "Democratic Party"
                },
            {
                "name": "Sandi Martinez" ,
                "party" : "Republican Party"
                }
            ],
        "Representative in General Court": [
            {
                "name": "Cory Atkins" ,
                "party" : "Democratic Party"
                },
            {
                "name": "Michael Benn" ,
                "party" : "Republican Party"
                }
            ],
        "Clerk of Courts": [
            {
                "name": "Michael Sullivan" ,
                "party" : "Democratic Party"
                }
            ],
        "Register of Deeds": [
            {
                "name": "Maria Curtatone" ,
                "party" : "Democratic Party"
                }
            ]
        }

    @classmethod
    def get_previous_winners(self,race_list):
        result = []
        for race in race_list:
            r = {}
            r['name'] = race.race_name
            r['winner'] = race.winner
            r['number'] = race.number
            result.append(r)

        return result

    @classmethod
    def get_race_index(self,counter):
        return counter%self.get_num_races()

    @classmethod
    def get_ballot_index(self,counter):
        return counter/self.get_num_races()

    @classmethod
    def get_race_name(self,counter):
        race_number = counter%self.get_num_races()
        return self.RACES[race_number]

    @classmethod
    def get_candidates(self,counter):
        race_number = self.get_race_index(counter)
        return self.CANDIDATES[self.RACES[race_number]]

    @classmethod
    def get_num_races(self):
        return len(self.RACES)
