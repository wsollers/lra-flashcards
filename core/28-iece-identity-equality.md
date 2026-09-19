# 28 IECE: Identity, Equality, Congruence, Equivalence

Cards for identity, equality, congruence, and equivalence in the IECE style.

## A. Identity And Equality

What is identity? >> Identity is sameness of object: `x` and `y` are identical when they are one and the same object.

What is equality in formal systems? >> Equality is the formal relation, usually written `=`, used to express identity or equality-like sameness inside the language.

What is the basic introduction rule for equality? >> Reflexivity: from any term `a`, infer `a = a`.

What is equality elimination? >> Substitution: from `a = b` and a statement true of `a`, infer the corresponding statement true of `b`.

What is Leibniz equality? >> `a = b` when every predicate true of `a` is true of `b`.

What is the Lean proof term for reflexive equality? >> `rfl`, when both sides are definitionally the same.

When does `rfl` work? >> When Lean can reduce both sides to the same expression by computation or definitional equality.

What is symmetry of equality? >> If `a = b`, then `b = a`.

How do you use equality symmetry in Lean? >> If `h : a = b`, then `h.symm : b = a`.

What is transitivity of equality? >> If `a = b` and `b = c`, then `a = c`.

How do you chain equalities in Lean? >> Use `Eq.trans h_ab h_bc` or a `calc` block.

What does `rw [h]` do with equality? >> It rewrites using equality `h` from left to right.

What does `rw [← h]` do? >> It rewrites using equality `h` from right to left.

What is a useful equality `calc` shape? >> `calc a = b := h_ab; _ = c := h_bc`.

What is the difference between propositional equality and definitional equality? >> Propositional equality is a proof object `a = b`; definitional equality is automatic convertibility Lean can see without a proof.

## B. Congruence

What is congruence? >> Congruence says an operation, function, relation, or context respects an equivalence or equality.

What is function congruence for equality? >> If `a = b`, then `f a = f b`.

What is binary-operation congruence? >> If `a₁ = a₂` and `b₁ = b₂`, then `op a₁ b₁ = op a₂ b₂`.

What does it mean for a relation to respect equality? >> Replacing equal inputs preserves whether the relation holds.

What is the proof pattern for congruence? >> Introduce equalities, rewrite with them, then close by reflexivity or the original hypothesis.

How can `rw` prove many congruence goals? >> Rewrite the variables on one side until the target matches a known fact.

What is a congruence relation on an algebraic structure? >> An equivalence relation compatible with the structure's operations.

Why does quotient construction need congruence? >> Operations on equivalence classes are well-defined only if equivalent representatives give equivalent outputs.

What is the key well-definedness theorem for quotient operations? >> If inputs are equivalent, then applying the operation to them gives equivalent results.

What is substitution as a congruence principle? >> Equal terms may be substituted into any valid context without changing truth.

## C. Equivalence Relations

What is an equivalence relation? >> A relation that is reflexive, symmetric, and transitive.

What is reflexivity? >> Every object is related to itself: `R x x`.

What is symmetry? >> If `R x y`, then `R y x`.

What is transitivity? >> If `R x y` and `R y z`, then `R x z`.

What is an equivalence class? >> The collection of all elements equivalent to a chosen representative.

What does it mean for equivalence classes to partition a set? >> Every element lies in exactly one equivalence class, and classes are either equal or disjoint.

When are two equivalence classes equal? >> When their representatives are equivalent.

What is the quotient by an equivalence relation? >> The collection/type of equivalence classes under that relation.

Why are representatives dangerous? >> Different representatives may name the same equivalence class, so definitions must not depend on arbitrary representative choices.

How do you prove a relation is an equivalence relation? >> Prove reflexivity, symmetry, and transitivity separately.

What Lean proof move often starts an equivalence-structure proof? >> `constructor`, often repeatedly, to split the required fields.

What is the shape of an equivalence theorem header? >> `theorem Name {α : Type u} (R : α → α → Prop) : Equivalence R := by ...`

## D. IECE Connections

What does IECE stand for here? >> Identity, Equality, Congruence, and Equivalence.

Why group identity, equality, congruence, and equivalence together? >> They are all sameness principles, but they operate at different strengths and abstraction levels.

How is equality stronger than an arbitrary equivalence relation? >> Equality identifies objects themselves; an equivalence relation may identify objects only for a chosen purpose.

How is congruence stronger than equivalence alone? >> Congruence adds compatibility with operations, relations, or contexts.

What should you ask before quotienting by an equivalence? >> Which operations must descend to the quotient, and have we proved congruence for each?

What does "respect the equivalence" mean? >> The construction gives equivalent outputs whenever given equivalent inputs.

What is a common IECE failure mode? >> Defining a quotient operation before proving it is independent of representative choice.

What is the safe workflow for quotient-style IECE work? >> Define equivalence, prove it is equivalence, prove congruence/well-definedness, then define quotient operations.

