import * as _ from "lodash";
import { StatBlock } from "../../common/StatBlock";
import { AccountClient } from "../Account/AccountClient";
import { Importer } from "./Importer";

export class StatBlockImporter extends Importer {
  public getType() {
    let sizeString = StatBlockImporter.Sizes[this.getString("size")];
    return (
      sizeString +
      " " +
      this.getCommaSeparatedStrings("type")[0] +
      ", " +
      this.getString("alignment")
    );
  }

  public getSource() {
    return _.startCase(this.getCommaSeparatedStrings("type")[1]);
  }

  public getAbilities() {
    return {
      Accuracy: this.getInt("Accuracy"),
      Communication: this.getInt("Communication"),
      Constitution: this.getInt("Constitution"),
      Fighting: this.getInt("Fighting"),
      Wis: this.getInt("wis"),
      Dexterity: this.getInt("Dexterity")
    };
  }

  public GetStatBlock() {
    let statBlock = StatBlock.Default();

    statBlock.Name = this.getString("name");
    statBlock.Id = AccountClient.MakeId(statBlock.Name);
    statBlock.Type = this.getType();
    statBlock.Source = this.getSource();
    statBlock.Abilities = this.getAbilities();

    statBlock.HP = this.getValueAndNotes("hp");
    statBlock.AC = this.getValueAndNotes("ac");
    statBlock.Challenge = this.getString("cr");

    statBlock.Speed = this.getCommaSeparatedStrings("speed");
    statBlock.ConditionImmunities = this.getCommaSeparatedStrings(
      "conditionImmune"
    );
    statBlock.DamageImmunities = this.getCommaSeparatedStrings("immune");
    statBlock.DamageResistances = this.getCommaSeparatedStrings("resist");
    statBlock.DamageVulnerabilities = this.getCommaSeparatedStrings(
      "vulnerable"
    );
    statBlock.Senses = this.getCommaSeparatedStrings("senses");
    statBlock.Languages = this.getCommaSeparatedStrings("languages");

    statBlock.Skills = this.getCommaSeparatedModifiers("skill");
    statBlock.Saves = this.getCommaSeparatedModifiers("save");

    statBlock.Traits = this.getPowers("trait");
    statBlock.Actions = this.getPowers("action");
    statBlock.Reactions = this.getPowers("reaction");
    statBlock.LegendaryActions = this.getPowers("legendary");

    return statBlock;
  }

  private static readonly Sizes = {
    T: "Tiny",
    S: "Small",
    M: "Medium",
    L: "Large",
    H: "Huge",
    G: "Gargantuan"
  };
}
