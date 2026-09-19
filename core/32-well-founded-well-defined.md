# 32 Well-Founded And Well-Defined

Cards for well-foundedness, well-definedness, representatives, and recursion.

## A. Well-Foundedness

What does well-founded mean? >> There are no infinite descending chains, or equivalently every nonempty set has a minimal element under the relation.

What is a well-founded relation used for? >> Induction and recursion over structures more general than natural numbers.

What is well-founded induction? >> To prove a property for `x`, assume it for all smaller predecessors of `x`, then prove it for `x`.

What is the proof shape of well-founded induction? >> `∀ x, (∀ y, y ≺ x → P y) → P x` implies `∀ x, P x`.

How does well-founded induction differ from ordinary induction? >> The induction step may use all smaller/predecessor cases, not only one immediate predecessor.

What is a descending chain? >> A sequence `x₀, x₁, x₂, ...` where each next element is strictly smaller than the previous one.

Why does an infinite descending chain violate well-foundedness? >> It prevents reaching a minimal base case.

What is a minimal element? >> An element with no strictly smaller element in the set.

What is accessibility? >> An element is accessible if all its predecessors are accessible; well-foundedness says every element is accessible.

What is structural recursion? >> Recursion justified because recursive calls are made on structurally smaller data.

What is measure-based recursion? >> Recursion justified by mapping data to a well-founded measure, often natural numbers.

## B. Well-Definedness

What does well-defined mean? >> A definition gives a unique, unambiguous value independent of presentation or choices.

When is well-definedness an issue? >> When objects have multiple names, representatives, witnesses, or construction choices.

Why do quotient constructions require well-definedness proofs? >> The output must not depend on which representative of an equivalence class is chosen.

What is the standard quotient-operation well-definedness shape? >> If `a ~ a'` and `b ~ b'`, then `op a b ~ op a' b'`.

What is a representative? >> A chosen object standing for an equivalence class.

Why are representatives dangerous? >> Different representatives can denote the same equivalence class.

What does it mean for a function on representatives to descend to a quotient? >> Equivalent representatives are sent to equivalent outputs.

What is the difference between existence and well-definedness? >> Existence says some object/value is available; well-definedness says the result is unique or independent of choices.

What is the difference between uniqueness and well-definedness? >> Uniqueness often proves there is only one possible value; well-definedness often proves all choices produce the same value or equivalent values.

What is the proof pattern for well-definedness? >> Assume two valid choices or equivalent representatives, then prove their outputs agree.

## C. Examples

Why is rational addition by pairs a well-definedness problem? >> The same rational can be represented by many integer pairs, so addition must respect the equivalence relation.

Why is defining a function by "choose an element" risky? >> Without uniqueness or choice data, different choices may produce different outputs.

Why is inverse construction often noncomputable? >> It may rely on existence/uniqueness or choice rather than an explicit algorithm.

What theorem usually follows a noncomputable choice definition? >> A correctness theorem showing the chosen object satisfies the desired property.

What is a "respects equivalence" theorem? >> A theorem saying equivalent inputs produce equivalent outputs.

How does congruence relate to well-definedness? >> Congruence is the compatibility property that often proves quotient definitions are well-defined.

What is a failure mode for well-definedness? >> Giving a formula on representatives but not proving it respects the equivalence relation.

What is a failure mode for well-foundedness? >> Defining recursion where recursive calls are not demonstrably smaller.

## D. Lean Proof Habits

What Lean tactic often starts a well-definedness proof? >> `intro` or `rintro` to bring representatives and equivalence hypotheses into context.

What Lean tactic often unpacks representative data? >> `rcases`.

What Lean tool helps with chains of equality or equivalence? >> `calc`.

What Lean command names an intermediate compatibility fact? >> `have`.

When should you unfold in well-definedness proofs? >> When the equivalence relation or operation definition must be exposed to prove compatibility.

When should you avoid unfolding? >> When named lemmas already state the needed compatibility or equivalence behavior.

What should a well-definedness theorem name communicate? >> Which operation or construction is independent of which choices.

What should a well-foundedness theorem name communicate? >> Which relation or measure justifies induction/recursion.

What is the safe construction workflow? >> Define relation, prove equivalence/well-foundedness as needed, prove compatibility/well-definedness, then expose the final operation.

