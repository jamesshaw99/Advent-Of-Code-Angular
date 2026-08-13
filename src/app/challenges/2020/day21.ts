import { day } from "../../helpers/day";

interface FoodItem {
  ingredients: Set<string>;
  allergens: Set<string>;
}

export class year2020day21 extends day {
  private foods: FoodItem[] = [];
  private allergenToIngredient = new Map<string, string>();
  private allIngredients = new Set<string>();
  private allAllergens = new Set<string>();

  override preChallenge(): void {
    this.parseInput();
    this.findAllergenMappings();
  }

  override part1(): string {
    const allergenicIngredients = new Set(this.allergenToIngredient.values());
    
    let safeIngredientCount = 0;
    for (const food of this.foods) {
      for (const ingredient of food.ingredients) {
        if (!allergenicIngredients.has(ingredient)) {
          safeIngredientCount++;
        }
      }
    }
    
    return `Number of safe ingredients: ${safeIngredientCount}`;
  }

  override part2(): string {
    const sortedAllergens = [...this.allergenToIngredient.keys()].sort();
    const dangerousIngredients = sortedAllergens.map(allergen => 
      this.allergenToIngredient.get(allergen)!
    );
    
    return `Dangerous ingredients: ${dangerousIngredients.join(',')}`;
  }

  private parseInput(): void {
    const allergenRegex = /^(.+) \(contains (.+)\)$/;
    
    for (const line of this.input) {
      const match = line.match(allergenRegex);
      if (!match) continue;
      
      const ingredients = new Set(match[1].split(' '));
      const allergens = new Set(match[2].split(', '));
      
      this.foods.push({ ingredients, allergens });
      
      ingredients.forEach(ingredient => this.allIngredients.add(ingredient));
      allergens.forEach(allergen => this.allAllergens.add(allergen));
    }
  }

  private findAllergenMappings(): void {
    const possibleIngredients = new Map<string, Set<string>>();
    
    for (const allergen of this.allAllergens) {
      let candidates = new Set(this.allIngredients);
      
      for (const food of this.foods) {
        if (food.allergens.has(allergen)) {
          candidates = this.intersectSets(candidates, food.ingredients);
        }
      }
      
      possibleIngredients.set(allergen, candidates);
    }

    this.solveMappings(possibleIngredients);
  }

  private solveMappings(possibleIngredients: Map<string, Set<string>>): void {
    while (possibleIngredients.size > 0) {
      const resolved: string[] = [];
      
      for (const [allergen, ingredients] of possibleIngredients) {
        if (ingredients.size === 1) {
          const ingredient = [...ingredients][0];
          this.allergenToIngredient.set(allergen, ingredient);
          resolved.push(allergen);
          
          for (const [otherAllergen, otherIngredients] of possibleIngredients) {
            if (otherAllergen !== allergen) {
              otherIngredients.delete(ingredient);
            }
          }
        }
      }
      
      resolved.forEach(allergen => possibleIngredients.delete(allergen));
      
      if (resolved.length === 0 && possibleIngredients.size > 0) {
        throw new Error('Unable to resolve allergen mappings');
      }
    }
  }

  private intersectSets<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set([...setA].filter(item => setB.has(item)));
  }
}