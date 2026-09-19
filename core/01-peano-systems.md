# 01 Peano Systems

Canonical RemNote-ready cards for the one-based Peano-system layer, revised to
pair the mathematics with beginner Lean modeling habits.

## A. Big Picture

What is a one-based Peano system? >> A structure with a carrier type, a distinguished first element `one`, a successor function `succ`, and axioms saying `one` is first, `succ` is injective, and induction holds.

What is the Lean-shaped skeleton of a one-based Peano structure? >> `structure PeanoSystem (Carrier : Type u) where one : Carrier; succ : Carrier → Carrier; one_not_succ : ∀ n, succ n ≠ one; succ_injective : ∀ m n, succ m = succ n → m = n; induction : ...`

Why say "carrier" instead of just "the naturals"? >> The carrier is the type whose elements behave like one-based natural numbers. A Peano system can be abstract before we identify it with a concrete model.

What is the intended concrete model? >> The positive natural numbers `{1,2,3,...}` with `one = 1` and `succ n = n + 1`.

What does one-based mean? >> The first element is `1`, not `0`; base clauses and induction start at `one`.

In Lean, where should the carrier type appear in a theorem about an arbitrary Peano system? >> Near the start of the header: `{Carrier : Type u}`.

In Lean, how do you pass a particular Peano system into a theorem? >> As an explicit structure argument, for example `(P : PeanoSystem Carrier)`.

What is the difference between the carrier and the Peano-system value? >> `Carrier` is the type of elements. `P : PeanoSystem Carrier` is the bundled data and laws on that type.

What are the primitive fields of the Peano structure? >> A first element `one`, a successor function `succ`, and axiom/proof fields for firstness, injectivity, and induction.

What is not primitive in the Peano layer? >> Addition, multiplication, order, integers, rationals, fields, completeness, sequences, and metric ideas are later constructions.

## B. Declaration Shapes

What is the generic Lean theorem-header shape for Peano facts? >> `theorem Name {Carrier : Type u} (P : PeanoSystem Carrier) (given : Carrier) (hypothesis : SomeProp P given) : BodyToProve P given := by ...`

How do you write a theorem that quantifies over an element of a Peano carrier? >> Put the element in the header: `(n : Carrier)`.

How do you write a theorem that assumes an element is not first? >> Add a named hypothesis: `(hn : n ≠ P.one)`.

How do you write a theorem whose body says an element has a predecessor? >> Use an existential body: `∃ m : Carrier, P.succ m = n`.

What is the Lean-shaped predecessor theorem header? >> `theorem ExistsPredecessor {Carrier : Type u} (P : PeanoSystem Carrier) (n : Carrier) (hn : n ≠ P.one) : ∃ m : Carrier, P.succ m = n := by ...`

How do you name a hypothesis that says `n` is not first? >> Use a name like `hn_not_one : n ≠ P.one` or short local name `hn : n ≠ P.one`.

How do you name a hypothesis that two successors are equal? >> Use a name like `hsucc : P.succ m = P.succ n`.

How do you apply the successor-injective axiom field? >> If `P.succ_injective : ∀ m n, P.succ m = P.succ n → m = n`, then use `exact P.succ_injective m n hsucc`.

What is the difference between a theorem body and a hypothesis in a header? >> Hypotheses before the final colon are facts you may use. The body after the final colon is the fact you must prove.

## C. Axioms As Lean Fields

State the first-element axiom mathematically. >> No element has successor equal to the first element: `∀ n, succ n ≠ one`.

How might the first-element axiom appear as a Lean structure field? >> `one_not_succ : ∀ n : Carrier, succ n ≠ one`.

If `P : PeanoSystem Carrier`, how do you use the first-element axiom at `n`? >> `P.one_not_succ n` gives a proof of `P.succ n ≠ P.one`.

State successor injectivity mathematically. >> If `succ m = succ n`, then `m = n`.

How might successor injectivity appear as a Lean structure field? >> `succ_injective : ∀ m n : Carrier, succ m = succ n → m = n`.

If you have `h : P.succ m = P.succ n`, how do you prove `m = n`? >> `exact P.succ_injective m n h`.

State induction in predicate form. >> If `Q one` and `∀ n, Q n → Q (succ n)`, then `∀ n, Q n`.

How might induction appear as a Lean field? >> `induction : ∀ Q : Carrier → Prop, Q one → (∀ n, Q n → Q (succ n)) → ∀ n, Q n`.

What are the three inputs to the induction field after the predicate? >> Base proof, step proof, and the target element.

How do you start proving something by a Peano induction field? >> Choose the predicate `Q`, then provide the base case and step case.

## D. Induction Proof Mechanics

What is the base case in one-based induction? >> Prove the predicate at `P.one`.

What is the induction step in one-based induction? >> Assume the predicate at an arbitrary `n`, then prove it at `P.succ n`.

What local variables do you expect in the induction step? >> An arbitrary `n : Carrier` and an induction hypothesis like `ih : Q n`.

What does "the induction hypothesis is local" mean? >> It applies to the current arbitrary predecessor `n`, not automatically to every element.

What Lean tactic usually introduces the arbitrary element in a universal goal? >> `intro n`.

What Lean tactic usually introduces an implication hypothesis? >> `intro h`.

What is the beginner proof shape for `∀ n, Q n` using an induction field? >> `exact P.induction Q base step`.

What is the beginner proof shape for the step function? >> `intro n ih` followed by a proof of `Q (P.succ n)`.

When would `show Q (P.succ n)` help in an induction step? >> When Lean's displayed target is hard to read; `show` restates the exact goal you intend to prove.

Why does induction rule out disconnected successor chains? >> The set or predicate "reachable from one by successors" contains `one` and is successor-closed, so induction forces every element to be reachable.

## E. Existentials And Predecessors

What does the predecessor property say? >> If `n ≠ one`, then there exists `m` with `succ m = n`.

How do you read `∃ m : Carrier, P.succ m = n`? >> There is a witness `m` in the carrier such that its successor is `n`.

How do you prove an existential goal in Lean? >> Use `use witness`, then prove the property for that witness.

How do you unpack an existential predecessor hypothesis? >> `rcases hpred with ⟨m, hm⟩`.

After `rcases hpred with ⟨m, hm⟩`, what do you have? >> A witness `m : Carrier` and a proof `hm : P.succ m = n`.

Why can `one` have no predecessor? >> The first-element axiom gives `P.succ m ≠ P.one` for every `m`.

What proof move turns a claimed predecessor of `one` into contradiction? >> Apply `P.one_not_succ m` to the equality `P.succ m = P.one`.

How do you use a contradiction hypothesis in Lean? >> If `hfalse : False`, use `exact False.elim hfalse`; often `exact (P.one_not_succ m) hm` closes a contradiction goal directly.

Why is a predecessor unique when it exists? >> If `succ m = n` and `succ k = n`, then `succ m = succ k`, so injectivity gives `m = k`.

What Lean theorem shape states predecessor uniqueness? >> `(hm : P.succ m = n) (hk : P.succ k = n) : m = k`.

What is the proof pattern for predecessor uniqueness? >> First derive `P.succ m = P.succ k`, then apply `P.succ_injective m k`.

Which rewrite may be needed to combine `hm : P.succ m = n` and `hk : P.succ k = n`? >> Use `rw [hm, hk]` or reason by `calc P.succ m = n := hm; _ = P.succ k := hk.symm`.

## F. Case Splits

What are the two cases in the predecessor-or-first classification? >> Either `n = one`, or `∃ m, succ m = n`.

What is the theorem body for predecessor-or-first? >> `n = P.one ∨ ∃ m : Carrier, P.succ m = n`.

When should you use `left` and `right` in Lean? >> To choose which side of an `Or` goal you are proving.

If the goal is `A ∨ B` and you can prove `A`, what tactic comes first? >> `left`.

If the goal is `A ∨ B` and you can prove `B`, what tactic comes first? >> `right`.

How do you split on a hypothesis `h : A ∨ B`? >> `cases h with | inl ha => ... | inr hb => ...`.

How do you split on whether `n = P.one` when classical reasoning is available? >> Use `by_cases hn : n = P.one`.

After `by_cases hn : n = P.one`, what are the two branches? >> One branch has `hn : n = P.one`; the other has `hn : ¬ n = P.one`.

How do you turn `hn : ¬ n = P.one` into the shape `n ≠ P.one`? >> They are the same shape; `¬ n = P.one` means `n ≠ P.one`.

## G. Recursion And Iteration

What is recursion on a Peano system used for? >> Defining functions by giving a base value and a rule for successors.

What data define a recursive function `f : Carrier → X`? >> A base value at `one` and a step rule that computes the value at `succ n` from the value at `n`.

What does a recursion theorem guarantee? >> Existence and uniqueness of the function satisfying the base and step clauses.

Why is uniqueness essential for recursion? >> It ensures the clauses define one function, not many incompatible functions.

What is iteration of successor? >> Repeated application of `succ` starting from a chosen element.

What is the base clause for successor iteration? >> Applying successor zero times returns the starting element.

What is the step clause for successor iteration? >> The next iterate is `succ` applied to the previous iterate.

What is the difference between induction and recursion? >> Induction proves propositions; recursion defines functions.

What is the difference between recursion and iteration? >> Iteration repeats one fixed operation; recursion can use a more general step rule.

What should you prove before using a recursively defined operation freely? >> Existence, uniqueness, and the defining equations for that operation.

## H. Addition And Multiplication

How is addition introduced from one-based Peano data? >> By recursion in one argument using `one` and `succ`.

Under a one-based convention, what must you check before writing addition clauses? >> Whether the base clause is `x + one = succ x` or another project-specific convention.

What is the conceptual addition step clause? >> Adding a successor advances the previous sum by successor.

Why does addition depend on recursion? >> The recursive clauses define addition for all elements, not just for the base and one step.

How is multiplication introduced after addition? >> By recursion, with the step clause expressed using addition.

What dependency chain should you remember? >> `one/succ/induction/recursion → addition → multiplication → order/arithmetic laws`.

Why are arithmetic laws not primitive by default? >> They should be proved from the recursive definitions unless the structure explicitly includes them as axioms.

What is a typical Lean theorem body for an addition base law? >> Something like `add x P.one = P.succ x`, depending on the chosen definition and names.

What is a typical Lean theorem body for an addition step law? >> Something like `add x (P.succ y) = P.succ (add x y)`.

Why should flashcards distinguish a definition from a theorem about the definition? >> A definition introduces the operation; theorem cards record the equations and laws used in proofs.

## I. Order Ideas For Later

What is a partial order? >> A relation satisfying reflexivity, antisymmetry, and transitivity.

What is a linear order? >> A partial order where every pair is comparable.

What does reflexivity mean? >> `x ≤ x` for every `x`.

What does antisymmetry mean? >> `x ≤ y` and `y ≤ x` imply `x = y`.

What does transitivity mean? >> `x ≤ y` and `y ≤ z` imply `x ≤ z`.

What does comparability mean? >> For any `x` and `y`, either `x ≤ y` or `y ≤ x`.

How do you chain two `≤` hypotheses in Lean? >> If `hxy : x ≤ y` and `hyz : y ≤ z`, use `exact le_trans hxy hyz`.

What is the strict order associated with `≤`? >> Usually `x < y` means `x ≤ y` and `x ≠ y`, though exact definitions may vary by development.

Why should order come after Peano recursion in this curriculum? >> The order is constructed or characterized from the natural-number structure, rather than assumed at the first Peano layer.

## J. Lean Debugging Habits For This Layer

If Lean does not recognize `P.one`, what should you check? >> Check that `P : PeanoSystem Carrier` is in scope and that the field is really named `one`.

If Lean does not know the type of `n`, what should you add? >> Add an annotation like `(n : Carrier)`.

If a theorem cannot use `≤`, what might be missing? >> A background order structure such as `[Preorder Carrier]`, or an imported/order definition appropriate to the layer.

When should you unfold a Peano definition? >> When the goal is stuck behind a named definition and the next proof step needs its body.

How do you unfold a definition in a hypothesis? >> `unfold DefinitionName at h`.

When should you prefer a theorem over unfolding? >> When a named theorem states the behavior you need and keeps representation details hidden.

What does `have` do in Peano proofs? >> It creates a named intermediate fact, such as a successor equality or a contradiction from firstness.

What does `calc` help with in Peano proofs? >> It makes chains of equalities, such as `succ m = n = succ k`, readable.

What does `rw [h]` do in Peano proofs? >> It rewrites using equality `h`, often replacing an element by `one` or a successor expression.

What does `rw [← h]` do? >> It rewrites in the reverse direction.

What does `exact` mean in this layer? >> Use an existing proof or axiom field whose type exactly matches the current goal.

What does `apply` mean in this layer? >> Use a theorem or axiom field to reduce the current goal to its required inputs.

What is the main learning goal of the Peano deck now? >> Learn both the mathematical Peano structure and the Lean moves for stating, unpacking, and proving first facts about it.
