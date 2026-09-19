# 30 ZFC Set Theory

Cards for ZFC axioms, set definitions, and basic theorem shapes.

## A. Basic Set Language

What is membership? >> `x ∈ A` means `x` is an element of the set `A`.

What is subset inclusion? >> `A ⊆ B` means every element of `A` is an element of `B`.

What is set extensionality? >> Sets are equal when they have exactly the same elements.

What is the proof shape for set equality? >> Prove both inclusions, or prove `∀ x, x ∈ A ↔ x ∈ B`.

How do you prove subset inclusion? >> Introduce an arbitrary `x` and a hypothesis `hx : x ∈ A`, then prove `x ∈ B`.

What is the empty set? >> The set with no elements.

What is a singleton? >> A set with exactly one element, usually `{a}`.

What is an unordered pair? >> `{a,b}`, the set whose only elements are `a` and `b`.

What is union? >> `⋃ A` or `A ∪ B`, collecting elements that belong to at least one set.

What is intersection? >> `A ∩ B`, collecting elements that belong to both sets.

What is set difference? >> `A \ B`, elements of `A` that are not elements of `B`.

What is complement relative to a universe? >> Elements in the ambient universe that are not in the set.

What is the power set of `A`? >> The set of all subsets of `A`.

What is the Cartesian product `A × B`? >> The set of ordered pairs `(a,b)` with `a ∈ A` and `b ∈ B`.

## B. ZFC Axioms

What does Extensionality say? >> Sets with the same elements are equal.

What does Empty Set say? >> There exists a set with no elements.

What does Pairing say? >> For any `a` and `b`, there is a set whose elements are exactly `a` and `b`.

What does Union say? >> For any set of sets, there is a set containing exactly the elements of members of that set.

What does Power Set say? >> For any set `A`, there is a set whose elements are exactly the subsets of `A`.

What does Infinity say? >> There exists an infinite inductive set, enough to construct natural numbers.

What does Separation say? >> A definable subclass of an existing set is a set.

Why is Separation restricted to subsets of an existing set? >> It prevents unrestricted comprehension paradoxes like Russell's paradox.

What does Replacement say? >> The image of a set under a definable functional relation is a set.

What does Foundation say? >> Every nonempty set has an ∈-minimal element; membership has no infinite descending chains.

What does Choice say? >> For a family of nonempty sets, there exists a choice function selecting one element from each.

What is the Well-Ordering Theorem? >> Every set can be well-ordered.

How is the Well-Ordering Theorem related to Choice? >> It is equivalent to the Axiom of Choice over standard ZF.

## C. Common ZFC Theorem Shapes

What does union membership look like for binary union? >> `x ∈ A ∪ B ↔ x ∈ A ∨ x ∈ B`.

What does intersection membership look like? >> `x ∈ A ∩ B ↔ x ∈ A ∧ x ∈ B`.

What does difference membership look like? >> `x ∈ A \ B ↔ x ∈ A ∧ x ∉ B`.

What does subset antisymmetry say? >> If `A ⊆ B` and `B ⊆ A`, then `A = B`.

How do you prove `A ⊆ A`? >> Introduce `x hx`; exact `hx`.

What does transitivity of subset say? >> If `A ⊆ B` and `B ⊆ C`, then `A ⊆ C`.

What is the proof pattern for subset transitivity? >> Given `x ∈ A`, apply the first inclusion to get `x ∈ B`, then the second to get `x ∈ C`.

What is Russell's paradox a warning against? >> Unrestricted set comprehension.

What is a class in set-theoretic language? >> A definable collection that may be too large to be a set.

What is a proper class? >> A class that is not a set.

Why is "the set of all sets" not a ZFC set? >> It would conflict with separation/Russell-style arguments.

## D. Set-Theoretic Constructions

How are ordered pairs often encoded in set theory? >> By a set-theoretic coding such as Kuratowski pair `{{a},{a,b}}`.

Why must ordered-pair coding satisfy a theorem? >> It must prove `(a,b) = (c,d)` iff `a = c` and `b = d`.

What is a relation as a set? >> A set of ordered pairs.

What is a function as a set? >> A relation where each input has exactly one output.

What is the domain of a relation? >> Inputs that appear as first components of related pairs.

What is the range/image of a relation? >> Outputs that appear as second components.

What is an indexed family in set theory? >> A function from an index set into a collection of sets.

What is a choice function? >> A function selecting one element from each set in a family of nonempty sets.

