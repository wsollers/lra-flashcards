# Mathlib: Bounds, Sequences, Rings, Fields, Limits

---

## What typeclass usually supplies `≤`?
Tags: mathlib order typeclasses

`LE α` supplies the notation, but theorems about order usually require richer classes such as `Preorder α`, `PartialOrder α`, `LinearOrder α`, or lattice classes.
---

## What is the usual shape of an upper bound predicate?
Tags: mathlib bounds order

```lean
∀ x, x ∈ s → x ≤ a
```

In Mathlib vocabulary this often appears through `BddAbove s`, `upperBounds s`, or custom predicates like `IsUpperBound a s`.
---

## What is the usual shape of a lower bound predicate?
Tags: mathlib bounds order

```lean
∀ x, x ∈ s → a ≤ x
```

The direction of `≤` is the main thing to watch.
---

## What does `BddAbove s` mean?
Tags: mathlib bounds bddabove

It means the set `s` has at least one upper bound.

Conceptually:

```lean
∃ a, ∀ x, x ∈ s → x ≤ a
```
---

## What does `BddBelow s` mean?
Tags: mathlib bounds bddbelow

It means the set `s` has at least one lower bound.

Conceptually:

```lean
∃ a, ∀ x, x ∈ s → a ≤ x
```
---

## What does `IsLUB s a` mean?
Tags: mathlib bounds supremum

`a` is a least upper bound of `s`: it is an upper bound, and every other upper bound is above it.

Conceptually:

```lean
(∀ x, x ∈ s → x ≤ a) ∧ ∀ b, (∀ x, x ∈ s → x ≤ b) → a ≤ b
```
---

## What does `IsGLB s a` mean?
Tags: mathlib bounds infimum

`a` is a greatest lower bound of `s`: it is a lower bound, and every other lower bound is below it.

Conceptually:

```lean
(∀ x, x ∈ s → a ≤ x) ∧ ∀ b, (∀ x, x ∈ s → b ≤ x) → b ≤ a
```
---

## What is `sSup s`?
Tags: mathlib bounds supremum complete-lattice

`sSup s` is the supremum of a set in a type with enough order structure, often a complete lattice or conditionally complete lattice. It is notation-backed by `Sup`.
---

## What is `sInf s`?
Tags: mathlib bounds infimum complete-lattice

`sInf s` is the infimum of a set in a type with enough order structure, often a complete lattice or conditionally complete lattice. It is notation-backed by `Inf`.
---

## What is the proof pattern for `IsLUB`?
Tags: mathlib bounds proof-patterns

Split the conjunction:

```lean
constructor
· intro x hx
  -- prove x ≤ a
· intro b hb
  -- prove a ≤ b
```
---

## What is the proof pattern for `IsGLB`?
Tags: mathlib bounds proof-patterns

Split the conjunction:

```lean
constructor
· intro x hx
  -- prove a ≤ x
· intro b hb
  -- prove b ≤ a
```
---

## What is a sequence in Lean?
Tags: mathlib sequences functions

A sequence of values in `α` is usually a function:

```lean
u : ℕ → α
```

Then `u n` is the `n`th term.
---

## How do you state eventual behavior of a sequence?
Tags: mathlib sequences filters eventually

Use filters:

```lean
∀ᶠ n in atTop, P (u n)
```

This means `P (u n)` holds for all sufficiently large `n`.
---

## What is `Filter.Tendsto u atTop (𝓝 a)`?
Tags: mathlib sequences limits filters

It states that the sequence/function `u` tends to `a` along `atTop`. For sequences, read it as `u n → a` as `n → ∞`.
---

## What is `𝓝 a`?
Tags: mathlib topology filters limits

`𝓝 a` is the neighborhood filter of `a`. A statement tending to `𝓝 a` says values eventually fall inside every neighborhood of `a`.
---

## What is `atTop`?
Tags: mathlib filters sequences

`atTop` is the filter for "eventually for sufficiently large values" on an ordered type such as `ℕ`, `ℤ`, or `ℝ`.
---

## What is the epsilon proof shape for a real sequence limit?
Tags: mathlib sequences limits epsilon

Conceptually, `u n → a` means:

```lean
∀ ε > 0, ∃ N, ∀ n ≥ N, |u n - a| < ε
```

Mathlib often expresses this through filters, but epsilon lemmas bridge the two views.
---

## What does `tendsto_const_nhds` prove?
Tags: mathlib limits sequences theorems

It proves that a constant function tends to that constant:

```lean
Tendsto (fun _ => a) l (𝓝 a)
```
---

## What does `h.add h'` often do for limits?
Tags: mathlib limits algebra

If `h : Tendsto f l (𝓝 a)` and `h' : Tendsto g l (𝓝 b)`, then `h.add h'` proves `Tendsto (fun x => f x + g x) l (𝓝 (a + b))`, assuming the needed topological algebra structure.
---

## What does `h.mul h'` often do for limits?
Tags: mathlib limits algebra

If `f → a` and `g → b`, then `f * g → a * b`, provided the relevant topological multiplication structure is available.
---

## What is a common typeclass stack for real limit algebra?
Tags: mathlib limits typeclasses

For concrete real sequences, `ℝ` already has the needed instances. For abstract types, limit algebra may require classes like `TopologicalSpace α`, `AddGroup α`, `ContinuousAdd α`, `Mul α`, or `ContinuousMul α`.
---

## What is `Ring R`?
Tags: mathlib algebra rings typeclasses

`Ring R` is a typeclass bundling addition, multiplication, additive inverses, zero, one, and ring laws on `R`.
---

## What is `CommRing R`?
Tags: mathlib algebra rings typeclasses

`CommRing R` is a ring whose multiplication is commutative. Many polynomial and field-adjacent lemmas require commutative multiplication.
---

## What is `Field K`?
Tags: mathlib algebra fields typeclasses

`Field K` is a commutative division ring with zero and one distinct. It supports division and inverse operations with field laws.
---

## What is `LinearOrderedField K`?
Tags: mathlib algebra fields order

It is a field with a compatible linear order, such as `ℚ` or `ℝ`. It supports ordered field reasoning used by `linarith`, positivity lemmas, and analysis inequalities.
---

## What is the difference between `/` and `⁻¹`?
Tags: mathlib algebra fields inverse division

`a / b` is usually notation for `a * b⁻¹`. Division often creates side conditions about `b ≠ 0`, depending on the theorem.
---

## What does `zero_ne_one` provide?
Tags: mathlib algebra fields nontrivial

It proves `0 ≠ 1` in a type where the relevant nontrivial algebraic structure is available, such as a field.
---

## What does `by positivity` do?
Tags: mathlib tactics positivity inequalities

The `positivity` tactic proves many goals of the form `0 ≤ expr` or `0 < expr` from known positivity of parts of `expr`.
---

## What is a common proof pattern for nonzero denominators?
Tags: mathlib fields proof-patterns

Name the nonzero proof, then use it with field simplification or inverse lemmas:

```lean
have hb : b ≠ 0 := by ...
field_simp [hb]
```
---

## What is the usual proof sequence for rational function identities?
Tags: mathlib fields tactics

1. Prove denominator nonzero side conditions.
2. Run `field_simp` to clear denominators.
3. Use `ring` for the resulting polynomial identity.
---

## What is `norm_num` good for?
Tags: mathlib tactics numerals

`norm_num` proves goals involving concrete numerals, arithmetic normalization, and simple inequalities.

It is often the right first tool for goals like `0 < (3 : ℝ)`.
---

## What is `nlinarith` good for?
Tags: mathlib tactics inequalities

`nlinarith` extends linear arithmetic with some nonlinear polynomial reasoning. It can solve inequalities involving products and squares when the necessary hypotheses are present.
---

## What is a semiring?
Tags: mathlib algebra semiring

A semiring has addition, multiplication, zero, one, distributivity, and no required additive inverses. Natural numbers are the guiding example.
---

## What is an additive group?
Tags: mathlib algebra groups

An additive group has `+`, `0`, unary negation, subtraction, and additive group laws. Rings and fields include additive group structure.
---

## Why do theorem names often include `.mono`, `.trans`, or `.antisymm`?
Tags: mathlib naming order

These suffixes signal common mathematical roles: monotonicity, transitivity, and antisymmetry. Search for them when order reasoning has a standard shape.
---

## What does `le_trans h1 h2` prove?
Tags: mathlib order inequalities

Given `h1 : a ≤ b` and `h2 : b ≤ c`, it proves `a ≤ c`.
---

## What does `lt_of_lt_of_le h1 h2` prove?
Tags: mathlib order inequalities

Given `h1 : a < b` and `h2 : b ≤ c`, it proves `a < c`.
---

## What does `lt_of_le_of_lt h1 h2` prove?
Tags: mathlib order inequalities

Given `h1 : a ≤ b` and `h2 : b < c`, it proves `a < c`.
---

## What does `abs_lt` usually help with?
Tags: mathlib analysis abs inequalities

It converts an absolute-value inequality into two inequalities:

```lean
|x| < ε ↔ -ε < x ∧ x < ε
```

The exact theorem shape depends on the ordered additive group/ring context.
---

## What does `dist` measure?
Tags: mathlib topology metric

`dist x y` is the distance between two points in a pseudo metric or metric space. The notation and theorems require a metric-space typeclass.
---

## What is `Metric.ball x r`?
Tags: mathlib topology metric balls

It is the open ball centered at `x` with radius `r`:

```lean
{y | dist y x < r}
```

Membership is often simplified using `Metric.mem_ball`.
---

## What does `Metric.mem_ball` rewrite?
Tags: mathlib topology metric balls rewrite

It rewrites membership in a metric ball into a distance inequality, typically:

```lean
y ∈ Metric.ball x r ↔ dist y x < r
```
---

## What does `dist_comm x y` say?
Tags: mathlib topology metric distance

Distance is symmetric:

```lean
dist x y = dist y x
```

It is often used before or after rewriting ball membership.
---

## What theorem shape proves one set is a subset of another?
Tags: mathlib sets subsets proof-patterns

To prove `s ⊆ t`, introduce an arbitrary member of `s` and prove it belongs to `t`:

```lean
intro x hx
-- prove x ∈ t
```
---

## How do boundedness and sequence convergence interact conceptually?
Tags: mathlib bounds sequences limits

Convergent real sequences are bounded. In Lean, expect a theorem to require a `Tendsto` hypothesis and produce an eventual bound or `BddAbove`/`BddBelow` statement, depending on the formulation.
---

## How should you search for Mathlib theorem names?
Tags: mathlib workflow search

Use `#check`, local imports, docs search, and name fragments from the mathematical role: `tendsto`, `bddAbove`, `isLUB`, `sSup`, `map`, `mono`, `abs`, `dist`, `ring`, or `field`.
---

## What is the best first move when a Mathlib theorem almost matches?
Tags: mathlib workflow theorem-use

Inspect the theorem's exact type with `#check`, then adapt your goal with `change`, `simpa`, rewriting, or a small helper `have` rather than rewriting the theorem statement from memory.
---

## What is the risk of guessing Mathlib names?
Tags: mathlib workflow names

Names and typeclass assumptions are precise. Guessing can waste time or pull the proof into the wrong abstraction. Confirm with `#check`, search, or a local example.
---
