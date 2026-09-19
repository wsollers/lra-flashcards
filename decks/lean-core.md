# Lean Core: Declarations, Types, Tactics, Modeling

---

## What is the usual shape of a Lean `def`?
Tags: lean core declarations def

```lean
def name (explicitArg : α) {implicitArg : β} [inst : C γ] : ResultType :=
  body
```

The header names the object and its parameters; the type after `:` is the promised result; the body after `:=` constructs that result.
---

## When should a Lean definition return `Prop`?
Tags: lean core modeling prop

Use `Prop` when you are defining a predicate, property, relation, law, or theorem-shaped condition.

```lean
def IsUpperBound (a : α) (s : Set α) : Prop :=
  ∀ x, x ∈ s → x ≤ a
```

A `Prop` definition is something to prove, not computational data to evaluate.
---

## When should a Lean definition return `Type` or data rather than `Prop`?
Tags: lean core modeling type

Return data when the definition constructs an object, function, record, set, number, map, or witness-bearing structure.

```lean
def square (n : Nat) : Nat := n * n
def preimage (f : α → β) (t : Set β) : Set α := fun x => f x ∈ t
```
---

## What is the usual shape of a Lean theorem header?
Tags: lean core declarations theorem

```lean
theorem Name
    {Carrier : Type u}          -- the carrier/type of objects
    [Instance? Carrier]         -- optional structure Lean should find
    {Given : Carrier}           -- implicit given object(s)
    (given : Carrier)           -- explicit given object(s)
    (hypothesis : SomeProp given) :
    BodyToProve given := by
  ...
```

Read the header in slots:

1. `theorem Name`
2. type/carrier variables: `{Carrier : Type u}`
3. optional typeclass/instance assumptions: `[Instance? Carrier]`
4. given mathematical objects: `{Given : Carrier}` or `(given : Carrier)`
5. named assumptions/hypotheses: `(hypothesis : SomeProp given)`
6. body/claim after the final colon: `BodyToProve given`
7. proof script after `:= by`
---

## What is a concrete example of that theorem-header shape?
Tags: lean core beginner theorem-header example

```lean
theorem UpperBoundMono
    {Carrier : Type u}
    [Preorder Carrier]
    {s : Set Carrier}
    {a b : Carrier}
    (ha : IsUpperBound a s)
    (hab : a ≤ b) :
    IsUpperBound b s := by
  ...
```

Here:

1. `Carrier` is the type.
2. `[Preorder Carrier]` is the instance/structure needed for `≤`.
3. `s`, `a`, and `b` are the given objects.
4. `ha` and `hab` are hypotheses.
5. `IsUpperBound b s` is the body to prove.
---

## How do you specify the carrier type in a theorem?
Tags: lean core beginner theorem-header carrier

Put the carrier before the objects that use it.

```lean
theorem MyTheorem
    {Carrier : Type u}
    ...
```

If you do not care about universe polymorphism yet, this beginner version is often enough:

```lean
theorem MyTheorem
    {Carrier : Type}
    ...
```
---

## How do you specify order, ring, field, or topology structure in a theorem?
Tags: lean core beginner theorem-header typeclasses

Put typeclass assumptions in square brackets after the carrier.

```lean
theorem OrderedFact
    {Carrier : Type u}
    [Preorder Carrier]
    ...
```

Common examples:

```lean
[Preorder α]
[PartialOrder α]
[LinearOrder α]
[Ring R]
[Field K]
[TopologicalSpace X]
```

Square brackets mean: "Lean, find this structure by typeclass search."
---

## How do you specify ordinary mathematical objects in a theorem header?
Tags: lean core beginner theorem-header parameters

Put each object with its type.

```lean
(x : α)
(s : Set α)
(f : α → β)
(R : α → α → Prop)
```

Use parentheses when the caller should supply the object explicitly. Use braces when Lean can usually infer it from later arguments.
---

## What is the difference between `(x : α)` and `{x : α}` in theorem headers?
Tags: lean core beginner theorem-header implicit

```lean
(x : α)   -- explicit argument
{x : α}   -- implicit argument
```

Explicit arguments are visible when calling the theorem. Implicit arguments are inferred from context.

Beginner rule: use `(x : α)` while learning; switch to `{x : α}` when the value is usually obvious from other arguments.
---

## How do you specify a hypothesis in a theorem header?
Tags: lean core beginner theorem-header hypotheses

Use a parenthesized name, colon, and proposition.

```lean
(hx : x ∈ s)
(hxy : x ≤ y)
(hP : P x)
(hUpper : IsUpperBound a s)
```

After `intro` or inside the proof, these names become usable facts.
---

## How do you specify several hypotheses with the same shape?
Tags: lean core beginner theorem-header hypotheses

You can write them separately:

```lean
(hx : x ∈ s) (hy : y ∈ s)
```

or group variables with the same type:

```lean
(x y z : α)
(hx : x ∈ s) (hy : y ∈ s)
```

Do not group hypotheses unless they really have the same proposition shape.
---

## Where does the theorem's actual claim go?
Tags: lean core beginner theorem-header goal

The claim goes after the final colon and before `:= by`.

```lean
theorem Name
    (h1 : P)
    (h2 : P → Q) :
    Q := by
  exact h2 h1
```

Everything before the colon is context. Everything after the colon is what you must prove.
---

## How do you start a proof of an implication?
Tags: lean core beginner intro implication

If the goal is:

```lean
⊢ P → Q
```

type:

```lean
intro hP
```

Now `hP : P` is available, and the new goal is `Q`.
---

## How do you start a proof of a universal statement?
Tags: lean core beginner intro forall

If the goal is:

```lean
⊢ ∀ x, P x
```

type:

```lean
intro x
```

Now `x` is arbitrary, and the new goal is `P x`.
---

## How do you introduce both an object and its membership hypothesis?
Tags: lean core beginner intro membership

For a goal like:

```lean
⊢ ∀ x, x ∈ s → x ≤ a
```

use:

```lean
intro x hx
```

Then Lean gives you `x : α`, `hx : x ∈ s`, and the goal `x ≤ a`.
---

## How do you use a hypothesis that is a function or implication?
Tags: lean core beginner hypotheses apply

If you have:

```lean
h : P → Q
hp : P
```

then:

```lean
have hq : Q := h hp
```

For a bound hypothesis:

```lean
ha : ∀ x, x ∈ s → x ≤ a
hx : x ∈ s
```

use:

```lean
have hxa : x ≤ a := ha x hx
```
---

## How do you make a new hypothesis from old hypotheses?
Tags: lean core beginner have hypotheses

Use `have`.

```lean
have hxa : x ≤ a := ha x hx
```

If the proof takes more than one line:

```lean
have hxc : x ≤ c := by
  exact le_trans hxa hac
```

Think: `have name : statement := proof`.
---

## How do you chain two `≤` hypotheses?
Tags: lean core beginner inequalities transitivity

If you have:

```lean
hab : a ≤ b
hbc : b ≤ c
```

then:

```lean
exact le_trans hab hbc
```

or:

```lean
have hac : a ≤ c := le_trans hab hbc
```
---

## How do you chain `<` and `≤` hypotheses?
Tags: lean core beginner inequalities transitivity

Common order combinators:

```lean
lt_trans       -- a < b, b < c gives a < c
lt_of_lt_of_le -- a < b, b ≤ c gives a < c
lt_of_le_of_lt -- a ≤ b, b < c gives a < c
le_trans       -- a ≤ b, b ≤ c gives a ≤ c
```

The order of arguments follows the chain from left to right.
---

## How do you write a `calc` block for inequalities?
Tags: lean core beginner calc inequalities

```lean
calc
  a ≤ b := hab
  _ ≤ c := hbc
  _ ≤ d := hcd
```

The underscore `_` means "continue from the previous line's right-hand side."
---

## How do you write a `calc` block for equalities?
Tags: lean core beginner calc equalities

```lean
calc
  a = b := h_ab
  _ = c := h_bc
  _ = d := h_cd
```

For algebraic equalities, each line can also be proved by `ring`, `simp`, or another theorem.
---

## When should you use `constructor`?
Tags: lean core beginner constructor

Use `constructor` when the goal asks you to build something with two main pieces.

Common goals:

```lean
⊢ P ∧ Q
⊢ P ↔ Q
⊢ ∃ x, P x      -- after choosing a witness, often leaves an And goal
⊢ SomeStructure
```

After `constructor`, Lean creates one goal for each required piece.
---

## How do you prove an `And` goal step by step?
Tags: lean core beginner constructor and

If the goal is:

```lean
⊢ P ∧ Q
```

write:

```lean
constructor
· exact hp
· exact hq
```

The first bullet proves `P`; the second proves `Q`.
---

## How do you prove an `Iff` goal step by step?
Tags: lean core beginner constructor iff

If the goal is:

```lean
⊢ P ↔ Q
```

write:

```lean
constructor
· intro hp
  -- prove Q
· intro hq
  -- prove P
```

An iff is two implications.
---

## When should you use `cases`?
Tags: lean core beginner cases

Use `cases` when you want to split a hypothesis or object by its constructors.

For a disjunction:

```lean
h : P ∨ Q
cases h with
| inl hp => ...
| inr hq => ...
```

For natural numbers:

```lean
cases n with
| zero => ...
| succ k => ...
```
---

## When should you use `rcases`?
Tags: lean core beginner rcases

Use `rcases` when a hypothesis packages data you want to unpack immediately.

```lean
rcases h with ⟨hp, hq⟩
rcases h with ⟨w, hw⟩
rcases h with hleft | hright
```

Beginner rule: `rcases` is great for `And`, `Exists`, and `Or` hypotheses.
---

## How do you unpack a conjunction hypothesis?
Tags: lean core beginner rcases and

If you have:

```lean
h : P ∧ Q
```

write:

```lean
rcases h with ⟨hp, hq⟩
```

Now `hp : P` and `hq : Q`.
---

## How do you unpack an existential hypothesis?
Tags: lean core beginner rcases exists

If you have:

```lean
h : ∃ x, P x
```

write:

```lean
rcases h with ⟨x, hx⟩
```

Now `x` is the witness and `hx : P x` is the proof it works.
---

## How do you prove an existential goal?
Tags: lean core beginner exists use

If the goal is:

```lean
⊢ ∃ x, P x
```

choose the witness:

```lean
use candidate
```

Then Lean asks you to prove `P candidate`.
---

## When should you use `unfold`?
Tags: lean core beginner unfold

Use `unfold Name` when the goal or a hypothesis is hiding behind a definition and you need to see its body.

```lean
unfold IsUpperBound
```

Beginner warning: unfolding too much makes goals noisy. Prefer unfolding one relevant definition at a time.
---

## How do you unfold a definition inside a hypothesis?
Tags: lean core beginner unfold hypotheses

Use `unfold Name at h`.

```lean
h : IsUpperBound a s
unfold IsUpperBound at h
```

Afterward, `h` may become something like:

```lean
h : ∀ x, x ∈ s → x ≤ a
```
---

## When should you use `simp [DefinitionName]` instead of `unfold`?
Tags: lean core beginner simp unfold

Use:

```lean
simp [DefinitionName]
```

when unfolding the definition should be followed by routine cleanup.

Use:

```lean
simp [DefinitionName] at h
```

to simplify a hypothesis.
---

## How do you rewrite the goal with an equality hypothesis?
Tags: lean core beginner rewrite

If you have:

```lean
h : a = b
```

then:

```lean
rw [h]
```

replaces `a` by `b` in the goal. Use `rw [← h]` to rewrite backward.
---

## How do you rewrite inside a hypothesis?
Tags: lean core beginner rewrite hypotheses

Use `at`.

```lean
rw [h] at hx
```

This rewrites inside hypothesis `hx` instead of the goal.

Use:

```lean
rw [h] at *
```

to rewrite in the goal and all hypotheses, but use this carefully.
---

## What does `exact` mean in beginner terms?
Tags: lean core beginner exact

`exact h` says: "the thing named `h` is exactly a proof of the current goal."

Example:

```lean
h : P
⊢ P
exact h
```
---

## What does `apply` mean in beginner terms?
Tags: lean core beginner apply

`apply h` says: "use theorem or hypothesis `h`; now prove whatever inputs `h` still needs."

Example:

```lean
h : P → Q
⊢ Q
apply h
-- new goal: P
```
---

## How do you prove a bound statement from an upper-bound hypothesis?
Tags: lean core beginner bounds hypotheses

If:

```lean
ha : IsUpperBound a s
hx : x ∈ s
```

and `IsUpperBound a s` unfolds to `∀ x, x ∈ s → x ≤ a`, then:

```lean
have hxa : x ≤ a := ha x hx
```

If Lean does not see the unfolded shape, try:

```lean
unfold IsUpperBound at ha
```
---

## How do `theorem`, `lemma`, and `example` differ?
Tags: lean core declarations theorem lemma example

`theorem` and `lemma` both create named declarations. Use `theorem` for central public results and `lemma` for supporting facts. `example` checks a proposition without adding a reusable name to the environment.
---

## What is an axiom in Lean?
Tags: lean core declarations axiom

```lean
axiom excludedMiddleLike (p : Prop) : p ∨ ¬ p
```

An `axiom` adds an unproved constant to the logical environment. It is powerful and dangerous: in ordinary project work, prefer definitions, theorem statements with proofs or explicit `sorry`, or imported existing axioms.
---

## What does `sorry` mean?
Tags: lean core proof-status sorry

`sorry` is a placeholder proof accepted by Lean with a warning. It lets the typecheck continue, but the declaration is not fully proved. Treat it as proof debt, never as a completed theorem.
---

## What are explicit, implicit, and instance arguments?
Tags: lean core syntax arguments typeclasses

```lean
(x : α)      -- explicit: caller usually supplies it
{x : α}      -- implicit: Lean infers it
[C α]        -- instance implicit: typeclass search finds it
```

Explicit arguments model mathematical inputs. Implicit arguments reduce clutter. Instance arguments request canonical structure such as `Preorder α`, `Ring R`, or `TopologicalSpace X`.
---

## What does `{α : Type u}` mean?
Tags: lean core types universes

It introduces an implicit type parameter `α` living in universe level `u`. The universe prevents paradoxes and lets definitions work uniformly over small and large types.
---

## When do you write `universe u v`?
Tags: lean core universes

Write it near the top of a file or section when declarations quantify over universe-polymorphic types.

```lean
universe u v
def Rel (α : Type u) (β : Type v) := α → β → Prop
```
---

## What is the difference between `Prop`, `Type`, and `Sort`?
Tags: lean core types prop sort

`Prop` is the universe of propositions. `Type u` is the universe of data types at level `u`. `Sort u` generalizes both: `Prop` is `Sort 0`, while `Type u` is essentially `Sort (u+1)`.
---

## How do you read `α → β → Prop`?
Tags: lean core types relations

As a curried binary relation: given `a : α` and `b : β`, it returns a proposition. Read `R a b` as "`a` is related to `b`."
---

## How is a set represented in Lean?
Tags: lean core sets modeling

In Mathlib, `Set α` is a predicate `α → Prop`. Membership `x ∈ s` means `s x`.

This is why set extensionality often reduces to proving membership equivalence for an arbitrary element.
---

## What is the modeling choice between `Set (α × β)` and `α → β → Prop`?
Tags: lean core relations modeling

`Set (α × β)` models a relation as a set of ordered pairs. `α → β → Prop` models it as a curried predicate. They are mathematically equivalent, but the curried form is usually easier for Lean proofs.
---

## What does `fun x => ...` create?
Tags: lean core functions lambda

It creates an anonymous function. Example:

```lean
fun x => x + 1
```

For predicates, `fun x => x ∈ s ∧ P x` creates a set-like condition.
---

## What does `by` introduce?
Tags: lean core tactics by

`by` switches from term mode to tactic mode. After `by`, tactics transform the proof goal until it is solved.
---

## What is a proof state?
Tags: lean core tactics proof-state

A proof state is Lean's current list of goals plus local hypotheses. Tactics read and transform this state. The main workflow is: inspect the target, introduce assumptions, decompose structure, rewrite or apply known facts, and close goals.
---

## What does `intro` do?
Tags: lean core tactics intro

`intro x` handles a goal beginning with `∀ x, ...` or `A → B` by moving the variable or assumption into the local context.

```lean
⊢ ∀ x, P x
intro x
-- x : ...
-- ⊢ P x
```
---

## What does `rintro` do?
Tags: lean core tactics intro patterns

`rintro` combines introduction with pattern matching.

```lean
rintro x ⟨hx, hy⟩
```

This introduces `x` and immediately splits a conjunction hypothesis into `hx` and `hy`.
---

## What does `exact` do?
Tags: lean core tactics exact

`exact h` closes the current goal when `h` has exactly the required type.

Use it when you already have the proof term or theorem Lean needs.
---

## What does `apply` do?
Tags: lean core tactics apply

`apply theoremName` uses a theorem whose conclusion matches the current goal, then creates new goals for the theorem's hypotheses.

It is backward reasoning: "to prove this goal, it is enough to prove these premises."
---

## What does `refine` do?
Tags: lean core tactics refine

`refine` is like `exact` or `apply`, but allows holes `_` for subgoals.

```lean
refine ⟨?_, ?_⟩
```

It is useful when building structured proofs with visible placeholders.
---

## What does `constructor` do?
Tags: lean core tactics constructor

`constructor` splits a goal whose target has one constructor, such as conjunction, iff, existential packages, or many structures.

For `P ∧ Q`, it creates goals `P` and `Q`.
---

## How do you prove an `And` goal?
Tags: lean core logic and

Use `constructor`, or provide a pair:

```lean
constructor
· exact hp
· exact hq

exact ⟨hp, hq⟩
```
---

## How do you use an `And` hypothesis?
Tags: lean core logic and cases

Destructure it:

```lean
rcases h with ⟨hp, hq⟩
```

or use projections:

```lean
exact h.left
exact h.right
```
---

## How do you prove an `Iff` goal?
Tags: lean core logic iff

Use `constructor`; Lean creates the forward and reverse implication goals.

```lean
constructor
· intro h
  ...
· intro h
  ...
```
---

## How do you use an `Iff` hypothesis?
Tags: lean core logic iff

If `h : P ↔ Q`, then `h.mp : P → Q` and `h.mpr : Q → P`.

You can also rewrite with it using `rw [h]` when appropriate.
---

## How do you prove an existential statement?
Tags: lean core logic exists

Use `use witness`, then prove the witness satisfies the remaining property.

```lean
use a
constructor
· exact ha_mem
· exact ha_bound
```
---

## How do you use an existential hypothesis?
Tags: lean core logic exists rcases

Destructure it with `rcases`.

```lean
rcases h with ⟨w, hw⟩
```

Now `w` is the witness and `hw` is its proof.
---

## What does `cases h with` do?
Tags: lean core tactics cases

It performs case analysis on data or proof constructors. For a disjunction `h : P ∨ Q`, it creates one branch with `P` and one branch with `Q`.
---

## What does `simp` do?
Tags: lean core tactics simp

`simp` rewrites using simplification lemmas until the goal is in a normal form. It unfolds reducible definitions marked or supplied for simplification, simplifies projections, evaluates basic computation, and uses lemmas tagged `[simp]`.
---

## When should you use `simp [DefinitionName]`?
Tags: lean core tactics simp unfold

Use it when a goal is blocked because a local definition must be unfolded.

```lean
simp [IsUpperBound]
```

This is common for predicate definitions whose logical body is hidden behind a name.
---

## What does `rw [h]` do?
Tags: lean core tactics rewrite

It rewrites the target using equality or iff lemma `h` from left to right.

`rw [← h]` rewrites from right to left.
---

## What is the difference between `rw` and `simp`?
Tags: lean core tactics rewrite simp

`rw` applies specified rewrites in a directed, local way. `simp` searches a simplification set and repeatedly rewrites until stable. Use `rw` for controlled algebraic or definitional changes; use `simp` for routine cleanup.
---

## What does `simpa using h` do?
Tags: lean core tactics simpa

It asks Lean to simplify both the target and the type of `h`, then use `h` to close the goal.

This is a compact way to bridge minor definitional, projection, or notation differences.
---

## What does `have h : P := by ...` do?
Tags: lean core tactics have

It creates a named intermediate proof.

```lean
have hbound : x ≤ a := by
  exact ha x hx
```

Use meaningful names when the proof reads like mathematics.
---

## What does `let x := ...` do in a proof?
Tags: lean core tactics let

It introduces a local abbreviation for data. Use `let` for objects you will refer to repeatedly; use `have` for propositions or proofs.
---

## What does `calc` provide?
Tags: lean core tactics calc

`calc` writes chained equality or order reasoning.

```lean
calc
  a ≤ b := hab
  _ ≤ c := hbc
```

It is ideal when the human proof is a visible chain.
---

## What does `omega` solve?
Tags: lean core tactics omega arithmetic

`omega` solves many linear arithmetic goals over natural numbers and integers. It is not a general algebra solver and generally does not handle nonlinear multiplication.
---

## What does `linarith` solve?
Tags: lean core tactics linarith arithmetic

`linarith` solves linear arithmetic over ordered semirings/rings/fields when the needed hypotheses are in context. It is useful for inequalities involving addition, subtraction, scalar multiplication by numerals, and order.
---

## What does `ring` solve?
Tags: lean core tactics ring algebra

`ring` normalizes and proves polynomial identities in semirings and rings.

It proves goals like `(x + y)^2 = x^2 + 2*x*y + y^2`, assuming the right algebraic typeclass instances are available.
---

## What does `field_simp` do?
Tags: lean core tactics field algebra

`field_simp` clears denominators in field-like expressions, usually creating or using nonzero side conditions. It is often followed by `ring` or `linarith`.
---

## What does `ext` do?
Tags: lean core tactics ext extensionality

`ext x` applies an extensionality theorem, usually reducing equality of sets, functions, or structures to equality at an arbitrary element or field.

For sets, it typically turns `s = t` into `∀ x, x ∈ s ↔ x ∈ t`.
---

## What does `unfold Name` do?
Tags: lean core tactics unfold

It replaces `Name` by its definition in the target or hypotheses. Prefer `simp [Name]` when simplification should also clean up the result.
---

## What does `change NewTarget` do?
Tags: lean core tactics change

It replaces the current target by a definitionally equal target. Use it when Lean's target is technically equivalent to the shape you want, but not displayed in a useful way.
---

## What does `show P` do?
Tags: lean core tactics show

`show P` states the goal shape you intend to prove. It is useful for documentation and for forcing Lean to elaborate the target as a particular proposition.
---

## How do you inspect a term's type while learning?
Tags: lean core commands inspect

Use:

```lean
#check term
#check theoremName
#print declarationName
```

Keep these in scratch or learning files, not production proofs unless the repo intentionally allows diagnostic commands.
---

## What is a structure in Lean?
Tags: lean core structures

A `structure` is a bundled record of fields.

```lean
structure MetricDefinition (X : Type u) where
  dist : X → X → Real
  nonneg : ∀ x y, 0 ≤ dist x y
```

An instance of the structure contains data and proofs for every field.
---

## How do you construct a structure value?
Tags: lean core structures constructor

Use record syntax:

```lean
{ dist := d
  nonneg := hnonneg
  symmetric := hsymm }
```

Lean checks that every required field is supplied.
---

## How do you access a structure field?
Tags: lean core structures projection

Use dot projection:

```lean
metric.dist x y
metric.symmetric x y
```

Projection works when Lean can infer the structure containing the field.
---

## What does `extends` mean in a structure?
Tags: lean core structures extends

```lean
structure GroupDefinition (G : Type u) extends MonoidDefinition G where
  inv : G → G
```

The new structure includes all fields of the parent structure plus additional fields.
---

## What is a class in Lean?
Tags: lean core classes typeclasses

A `class` is a structure whose values can be found by typeclass search.

Use classes for ambient reusable structure, like `Preorder α` or `Ring R`. Use ordinary structures when you want explicit model values and local control.
---

## What does `[Preorder α]` ask Lean to do?
Tags: lean core classes typeclasses

It asks typeclass search to find an available preorder structure on `α`. Once found, notation and theorems using `≤` become available.
---

## When should modeling use explicit structure parameters instead of typeclasses?
Tags: lean core modeling typeclasses

Use explicit structures when multiple competing structures may exist on the same carrier, when the construction is local, or when you want proofs to mention the selected model directly.

Use typeclasses for canonical, ambient, widely shared structure.
---

## What is a namespace for?
Tags: lean core namespaces

Namespaces organize names and prevent collisions.

```lean
namespace LRA.VolumeI.Identity
...
end LRA.VolumeI.Identity
```

Inside the namespace, declarations get fully qualified names like `LRA.VolumeI.Identity.Name`.
---

## What does `open Namespace` do?
Tags: lean core namespaces open

It makes names from a namespace available without full qualification in the current scope.

Prefer local `open` usage when broad imports would make names ambiguous.
---

## What does `section ... end` do?
Tags: lean core sections variables

A section groups variables, local instances, and declarations. Variables introduced inside a section are available to declarations in that section but do not leak afterward.
---

## What does `variable` do?
Tags: lean core variables

It declares reusable parameters for following declarations in the current namespace or section.

```lean
variable {α : Type u} [Preorder α]
```

Use it to avoid repeating common parameters in a group of nearby definitions or theorems.
---

## How do you decide what parameters belong before the colon?
Tags: lean core declarations headers

Put all objects, structures, and hypotheses needed to state the result before the colon. The proposition or result type after the colon should read as the main mathematical claim.
---

## What should theorem hypothesis names communicate?
Tags: lean core style hypotheses

Names should describe mathematical content:

```lean
(upperA : IsUpperBound a s)
(a_le_b : a ≤ b)
```

Avoid throwaway names in public or long proofs when the names carry the proof narrative.
---

## What is the difference between parameters in parentheses and section variables?
Tags: lean core declarations variables

Parenthesized parameters belong explicitly to one declaration. Section variables are automatically inserted into each declaration that uses them. Prefer explicit parameters when the declaration should be understandable in isolation.
---

## What does `noncomputable def` mean?
Tags: lean core declarations noncomputable

It defines an object that may rely on classical choice, existence proofs, quotients, or other non-executable principles. The definition is mathematically valid but not intended as executable code.
---

## What does `open Classical` or `classical` enable?
Tags: lean core classical

It enables classical reasoning such as choice and decidability of propositions. Use it deliberately, especially in constructive or foundational areas.
---

## What is a coercion?
Tags: lean core types coercions

A coercion is an automatic conversion Lean inserts between compatible types, such as a subtype element to its underlying value. Coercions are convenient but can obscure what type a term actually has.
---

## What is a subtype?
Tags: lean core types subtype

```lean
{x : α // P x}
```

A subtype value contains data `x : α` plus a proof that `P x`. Access the data with `.val` and the proof with `.property`.
---

## How do you model "an element with a property"?
Tags: lean core modeling subtype

Use a subtype when the property should travel with the element:

```lean
{x : α // x ∈ s}
```

Use a separate variable and hypothesis when the property should remain a local assumption:

```lean
(x : α) (hx : x ∈ s)
```
---

## What is quotient modeling for?
Tags: lean core modeling quotient

Use quotients when objects are equivalence classes of representatives, such as rationals as integer pairs or reals as Cauchy sequences. The core proof burden is showing operations respect the equivalence relation.
---

## What is a well-definedness theorem?
Tags: lean core modeling quotient well-definedness

It proves that a definition does not depend on arbitrary choices of representative.

For quotients, the usual shape is: if representatives are equivalent, then applying the operation to them gives equivalent results.
---

## What is a satisfaction theorem?
Tags: lean core modeling structures

It proves that a construction realizes a specified interface or law package.

Example shape: a concrete construction satisfies semigroup, ring, field, order, or completeness laws.
---

## What is a bridge or adapter theorem?
Tags: lean core modeling interop

It connects two representations without globally merging them.

Example: an LRA construction maps to Mathlib's `Int` and agrees with Mathlib operations through explicit conversion functions.
---

## When should you create a helper lemma?
Tags: lean core proof-design lemmas

Create a helper lemma when a sub-argument is reused, has a clear mathematical name, or would make the main proof too dense. Avoid helper lemmas that are only tactic scaffolding unless local proof readability improves.
---

## How do you read a goal `⊢ A → B`?
Tags: lean core proof-state implication

Lean is asking for a function from proofs of `A` to proofs of `B`. The usual first move is:

```lean
intro hA
```
---

## How do you read a goal `⊢ ∀ x, P x`?
Tags: lean core proof-state forall

Lean is asking for a proof for an arbitrary `x`. The usual first move is:

```lean
intro x
```
---

## How do you read a goal `⊢ ∃ x, P x`?
Tags: lean core proof-state exists

Lean is asking for a witness and a proof that it works. Usually:

```lean
use candidate
```
---

## How do you read a goal `⊢ P ∧ Q`?
Tags: lean core proof-state and

Lean is asking for both proofs. Usually:

```lean
constructor
```
---

## How do you read a goal `⊢ P ↔ Q`?
Tags: lean core proof-state iff

Lean is asking for both directions. Usually:

```lean
constructor
· intro hp
  ...
· intro hq
  ...
```
---

## What should you try when Lean cannot infer a type?
Tags: lean core elaboration types

Add type annotations near the ambiguity:

```lean
(x : α)
(s : Set α)
show P from ...
have h : P := ...
```

Lean errors often improve once the intended type is explicit.
---

## What should you try when typeclass search fails?
Tags: lean core elaboration typeclasses

Check whether the needed instance is in scope, whether imports expose it, and whether the carrier type is the one with the instance.

Sometimes an explicit argument, local instance, or adapter theorem is better than forcing global typeclass search.
---

## Why prefer readable proofs over tactic golf?
Tags: lean core style proofs

Readable proofs preserve the mathematical argument, make later repair easier, and help theorem statements stay aligned with the intended source. Compact tactic scripts can hide fragile dependencies.
---

## What belongs in a Lean doc comment for a public mathematical declaration?
Tags: lean core style doc-comments

State the object or theorem in ordinary mathematical language, mention important dependencies or proof status, and expose the formal logical shape when the project expects searchable hover text.
---

## How should a definition doc comment describe a predicate?
Tags: lean core style doc-comments prop

Name the predicate and describe its membership, evaluation, or field condition.

Example: "`a` is an upper bound for `s` when every member of `s` is less than or equal to `a`."
---

## How should a theorem doc comment describe a two-direction proof?
Tags: lean core style doc-comments iff

State the theorem in its displayed Lean direction, then add an "equivalently" or "memberwise" sentence describing the elementwise or bidirectional proof shape.
---

## What is the safest way to model a theorem before proving it?
Tags: lean core workflow theorem-design

First make the statement typecheck. Check that parameters, typeclasses, namespaces, and notation mean exactly what the mathematics intends. Only then start proof search.
---

## What is the danger of adding global instances?
Tags: lean core modeling instances

Global instances affect typeclass search everywhere downstream. They can introduce ambiguity, slow search, or make notation resolve unexpectedly. Prefer local instances or explicit adapters until a canonical structure is clear.
---

## What is the difference between reducible definitions and theorem APIs?
Tags: lean core modeling api

A reducible definition can be unfolded by proof automation. A theorem API gives named facts without exposing representation. Prefer theorem APIs when callers should not depend on the internal representation.
---

## How do you keep representation details local?
Tags: lean core modeling abstraction

Expose constructors, projections, and theorems that state the intended behavior. Keep low-level encodings behind namespaces, private helpers, or construction-specific modules.
---

## What is an import aggregator?
Tags: lean core modules imports

An aggregator module imports a curated collection of modules so users can import one stable name. It should not add new mathematical content unless the project explicitly uses it that way.
---

## How do you avoid circular imports?
Tags: lean core modules imports

Place definitions in the earliest common dependency layer, move shared lemmas upward, and keep examples/tests from importing back into core theory.
---

## What is the first question when choosing where a theorem belongs?
Tags: lean core modules placement

Ask: "At what level is this theorem true?" Place it at the highest general layer where the assumptions are sufficient, rather than duplicating it in a specific construction.
---

## What does "source-facing PascalCase" mean in this project?
Tags: lean core lra naming

Public declarations that mirror mathematical source content use descriptive PascalCase names, such as `IsUpperBound` or `MaximumIsSupremum`. Local proof helpers may use snake_case when they are genuinely internal.
---

## What is a good Lean workflow for a new concept?
Tags: lean core workflow modeling

1. Decide the carrier types and structures.
2. Write predicate or data definitions.
3. Write theorem statements that expose the intended API.
4. Prove small reusable lemmas.
5. Add examples or tests only after the core shape is stable.
---

## What is a good Lean workflow for a stuck proof?
Tags: lean core workflow tactics

1. Read the target and hypotheses.
2. Unfold only the definitions relevant to the goal.
3. Introduce variables and decompose conjunctions/existentials.
4. Search for theorem APIs before doing representation work.
5. Use `have` claims to make the mathematical path visible.
---

## What is a common proof pattern for monotonic upper bounds?
Tags: lean core proof-patterns bounds

To prove `b` is an upper bound from `a` being an upper bound and `a ≤ b`:

```lean
intro x hx
exact le_trans (ha x hx) hab
```

The pattern is: introduce an arbitrary member, get the old bound, compose inequalities.
---

## What is a common proof pattern for set equality?
Tags: lean core proof-patterns sets ext

Use extensionality and prove membership equivalence:

```lean
ext x
constructor
· intro hx
  ...
· intro hx
  ...
```
---

## What is a common proof pattern for function equality?
Tags: lean core proof-patterns functions ext

Use function extensionality:

```lean
funext x
```

Then prove the two functions give equal values at arbitrary `x`.
---

## What is a common proof pattern for structure equality?
Tags: lean core proof-patterns structures ext

Use extensionality if an ext theorem exists, or prove each field equal. Often the better design is to prove fieldwise behavior rather than relying on record equality.
---

## What is a common proof pattern for a bundled algebraic law?
Tags: lean core proof-patterns algebra structures

Open the structure value, use its named law fields, and avoid reproving laws from raw operation definitions unless the construction-specific theorem is exactly about those definitions.
---

## What is a common proof pattern for "operation respects equivalence"?
Tags: lean core proof-patterns quotient

Assume equivalent inputs, unfold the operation on representatives, and prove the outputs are equivalent. This theorem is usually needed before defining an operation on a quotient.
---

## What is a common proof pattern for classical choice definitions?
Tags: lean core proof-patterns classical

First prove existence and uniqueness or sufficient existence. Then define the chosen object with `Classical.choose` or a noncomputable construction, and prove a correctness theorem about the chosen object.
---

## What does a good theorem header do for future proof work?
Tags: lean core headers theorem-design

It exposes exactly the assumptions the proof needs, avoids hidden representation commitments, and leaves the conclusion in the vocabulary callers want to use.
---

## What does a good definition header do for future theorem work?
Tags: lean core headers def-design

It orders parameters from general structure to specific objects, keeps inferable type parameters implicit, and returns the mathematical object or proposition that downstream theorems should cite.
---

## What should you do before changing a theorem statement to make a proof easier?
Tags: lean core workflow theorem-design

Check whether the new statement still says the intended mathematics. If the proof is hard because the abstraction boundary is wrong, add or use a supporting lemma instead of weakening the theorem accidentally.
---

## What is "term mode" in Lean?
Tags: lean core term-mode

Term mode writes the proof or object directly as an expression:

```lean
fun x hx => le_trans (ha x hx) hab
```

It is concise for simple functions and direct proof terms.
---

## What is "tactic mode" in Lean?
Tags: lean core tactic-mode

Tactic mode writes a script after `by` that incrementally transforms goals. It is clearer for proofs with branching, decomposition, or several intermediate claims.
---

## When is `aesop` appropriate?
Tags: lean core tactics aesop

`aesop` can solve routine logical goals using registered rules. Use it for local automation after the statement is clear; avoid relying on it when it hides the main mathematical argument of a public theorem.
---

## What does `all_goals` do?
Tags: lean core tactics all-goals

It applies a tactic to every remaining goal.

```lean
all_goals simp
```

Use it when every branch has the same routine cleanup.
---

## What is the danger of proving by repeated unfolding?
Tags: lean core proof-design unfolding

Repeated unfolding couples proofs to representation details. Prefer named theorem APIs once a concept has stable behavior, especially across modules.
---

## What is the role of tests and examples in Lean projects?
Tags: lean core workflow tests examples

Examples show intended use and compile-check behavior. Tests catch regressions. They should not become the primary source of reusable theory; central facts belong in named declarations.
---

## What does it mean for Lean to elaborate a declaration?
Tags: lean core elaboration

Elaboration resolves implicit arguments, typeclasses, overloaded notation, coercions, universe levels, and expected types until the declaration has a fully checked core expression.
---

## What is a useful mental model for Lean errors?
Tags: lean core workflow errors

Lean errors usually mean one of three things: the target is not what you thought, a hypothesis has a different type than expected, or an instance/import/notation is missing. Inspect types before changing mathematics.
---
