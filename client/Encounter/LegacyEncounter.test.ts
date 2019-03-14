import { UpdateLegacySavedEncounter } from "./UpdateLegacySavedEncounter";

function makev0_1StatBlock() {
  return {
    Name: "v0.1 Creature",
    Type: "",
    HP: { Value: 1 },
    AC: { Value: 10 },
    Speed: ["Walk 30"],
    Abilities: { Accuracy: 10, Communication: 10, Constitution: 10, Cha: 10, Int: 10, Wis: 10 },
    DamageVulnerabilities: [],
    DamageResistances: [],
    DamageImmunities: [],
    ConditionImmunities: [],
    Saves: [],
    Skills: [],
    Senses: [],
    Languages: [],
    Challenge: "",
    Traits: [],
    Actions: [],
    LegendaryActions: []
  };
}

describe("Legacy Encounter", () => {
  test("Loads a v0.1 encounter", () => {
    const v1Encounter = {
      Name: "V0.1 Encounter",
      ActiveCreatureIndex: 0,
      Creatures: [
        {
          Statblock: makev0_1StatBlock(),
          CurrentHP: 1,
          TemporaryHP: 0,
          Initiative: 10,
          Alias: "",
          Tags: []
        }
      ]
    };

    const updatedEncounter = UpdateLegacySavedEncounter(v1Encounter);
    expect(updatedEncounter.Id).toBe("V01_Encounter");
    expect(updatedEncounter.Name).toBe("V0.1 Encounter");
    expect(updatedEncounter.Path).toBe("");
    expect(updatedEncounter.Version).toBe("legacy");
    expect(updatedEncounter.Combatants).toHaveLength(1);

    const updatedCombatant = updatedEncounter.Combatants[0];

    expect(updatedCombatant.Id).toHaveLength(8);
    expect(updatedEncounter.ActiveCombatantId).toEqual(updatedCombatant.Id);
    expect(updatedCombatant.CurrentHP).toBe(1);
    expect(updatedCombatant.RevealedAC).toBe(false);
  });
});
