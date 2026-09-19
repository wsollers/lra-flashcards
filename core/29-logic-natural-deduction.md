# 29 Logic: Orders, Quantifiers, And Natural Deduction

Introductory cards for first-, second-, and third-order logic, quantifiers, and
natural deduction rules.

## A. Orders Of Logic

What is first-order logic? >> Logic where quantifiers range over individuals/objects, not over predicates, sets, or functions.

What is a first-order universal quantifier? >> `∀ x, P x`, read "for every object `x`, `P x` holds."

What is a first-order existential quantifier? >> `∃ x, P x`, read "there exists an object `x` such that `P x` holds."

What is second-order logic? >> Logic where quantifiers may range over predicates, relations, sets, or functions on individuals.

What is a second-order example? >> `∀ P : α → Prop, P a → P b`.

What is third-order logic? >> Logic where quantifiers may range over collections of second-order objects, such as predicates of predicates.

Why keep second- and third-order cards introductory? >> The main beginner skill is recognizing what the quantifiers range over.

How do you identify the order of a quantified statement? >> Ask what kind of thing the bound variable is: individual, predicate/relation/function, or higher-level collection.

## B. Universal Rules

What is universal instantiation (UI)? >> From `∀ x, P x`, infer `P a` for a particular `a`.

How do you use UI in Lean? >> If `h : ∀ x, P x`, then `h a : P a`.

What is universal generalization (UG)? >> To prove `∀ x, P x`, prove `P x` for an arbitrary `x`.

How do you perform UG in Lean tactic mode? >> Use `intro x`; Lean gives an arbitrary `x` and asks for `P x`.

What is the side condition for UG? >> The chosen `x` must be arbitrary, not dependent on a special assumption that should not generalize.

What is a common beginner mistake with UG? >> Proving the statement for one special object and treating it as proof for all objects.

What is the proof shape for `∀ x, P x → Q x`? >> `intro x hx`, then prove `Q x`.

What does `intro x hx` do? >> It introduces the arbitrary object `x` and the hypothesis `hx : P x`.

## C. Existential Rules

What is existential introduction? >> To prove `∃ x, P x`, provide a witness `a` and prove `P a`.

How do you prove an existential in Lean? >> Use `use a`, then prove the remaining property.

What is existential elimination? >> From `∃ x, P x`, reason with an arbitrary witness `w` satisfying `P w`.

How do you unpack an existential in Lean? >> `rcases h with ⟨w, hw⟩`.

After unpacking `h : ∃ x, P x`, what do you get? >> A witness `w` and a proof `hw : P w`.

What is the side condition for existential elimination? >> The final conclusion must not depend on the particular witness name except through the existential information.

What is a common beginner mistake with existentials? >> Treating a witness from `∃ x, P x` as canonical or unique without proof.

## D. Propositional Natural Deduction

What is implication introduction? >> To prove `P → Q`, assume `P` and prove `Q`.

How do you do implication introduction in Lean? >> `intro hp`.

What is implication elimination? >> Modus ponens: from `P → Q` and `P`, infer `Q`.

How do you use implication elimination in Lean? >> If `h : P → Q` and `hp : P`, then `h hp : Q`.

What is conjunction introduction? >> To prove `P ∧ Q`, prove `P` and prove `Q`.

How do you prove conjunction in Lean? >> `constructor`, then solve the two goals.

What is conjunction elimination? >> From `P ∧ Q`, infer `P`; from `P ∧ Q`, infer `Q`.

How do you unpack conjunction in Lean? >> `rcases h with ⟨hp, hq⟩`, or use `h.left` and `h.right`.

What is disjunction introduction? >> To prove `P ∨ Q`, prove one side.

How do you prove the left side of an `Or` in Lean? >> Use `left`, then prove `P`.

How do you prove the right side of an `Or` in Lean? >> Use `right`, then prove `Q`.

What is disjunction elimination? >> From `P ∨ Q`, prove the desired conclusion from each case.

How do you split an `Or` hypothesis in Lean? >> `cases h with | inl hp => ... | inr hq => ...`.

What is negation in natural deduction? >> `¬ P` means `P → False`.

How do you prove negation in Lean? >> `intro hp`, then derive contradiction.

What is proof by contradiction? >> Assume the negation of the goal and derive `False`.

## E. Inverse, Converse, Contrapositive

For implication `P → Q`, what is the converse? >> `Q → P`.

For implication `P → Q`, what is the inverse? >> `¬ P → ¬ Q`.

For implication `P → Q`, what is the contrapositive? >> `¬ Q → ¬ P`.

Which form is logically equivalent to the original implication classically? >> The contrapositive.

Is the converse generally equivalent to the original? >> No. It needs separate proof.

Is the inverse generally equivalent to the original? >> No. It is equivalent to the converse, not the original.

What is the Lean proof pattern for contrapositive reasoning? >> Assume `hnq : ¬ Q`; to prove `¬ P`, introduce `hp : P`, get `hq : Q`, then contradiction.

What is a common flashcard trap with converse and inverse? >> Confusing "related statement" with "logically equivalent statement."

