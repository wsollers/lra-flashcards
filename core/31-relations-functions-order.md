# 31 Relations, Functions, Order, And Well-Ordering

Cards for relations, functions, order theory, and the well-ordering principle.

## A. Relations

What is a binary relation from `A` to `B`? >> A predicate on pairs, or a subset of `A × B`.

What is a relation in Lean's curried style? >> `R : α → β → Prop`.

How do you read `R a b`? >> "`a` is related to `b`."

What is a relation on one type? >> `R : α → α → Prop`.

What is reflexivity? >> `∀ x, R x x`.

What is irreflexivity? >> `∀ x, ¬ R x x`.

What is symmetry? >> `∀ x y, R x y → R y x`.

What is antisymmetry? >> `∀ x y, R x y → R y x → x = y`.

What is asymmetry? >> `∀ x y, R x y → ¬ R y x`.

What is transitivity? >> `∀ x y z, R x y → R y z → R x z`.

What is totality or comparability? >> For all `x y`, either `R x y` or `R y x`.

What is the converse of a relation? >> The relation reversing arguments: `Rᵒᵖ x y` holds when `R y x` holds.

What is relation composition? >> `S ∘ R` relates `x` to `z` when there exists `y` with `R x y` and `S y z`.

What is the identity relation? >> The relation `x = y`.

## B. Functions

What is a function? >> A relation assigning each input exactly one output.

What is totality for a function relation? >> Every input has at least one output.

What is uniqueness for a function relation? >> Each input has at most one output.

What is the Lean type of a function from `α` to `β`? >> `α → β`.

What is injectivity? >> `f x = f y` implies `x = y`.

What is surjectivity? >> Every codomain element is hit by some input.

What is bijectivity? >> Both injective and surjective.

What is function composition? >> Applying one function after another: `(g ∘ f) x = g (f x)`.

What is the identity function? >> The function sending every input to itself.

What is a left inverse? >> `g` is a left inverse of `f` if `g (f x) = x`.

What is a right inverse? >> `g` is a right inverse of `f` if `f (g y) = y`.

How does a left inverse relate to injectivity? >> Existence of a left inverse implies injectivity.

How does a right inverse relate to surjectivity? >> Existence of a right inverse implies surjectivity.

## C. Order Theory

What is a preorder? >> A reflexive and transitive relation.

What is a partial order? >> A preorder that is also antisymmetric.

What is a linear order? >> A partial order where every pair is comparable.

What is a strict order? >> Usually an irreflexive and transitive relation.

What is a least element of a set? >> An element of the set that is below every element of the set.

What is a greatest element of a set? >> An element of the set that is above every element of the set.

What is a minimal element? >> An element with no strictly smaller element in the set.

What is a maximal element? >> An element with no strictly larger element in the set.

How does least differ from minimal? >> Least compares below every element; minimal only rules out smaller elements.

How does greatest differ from maximal? >> Greatest compares above every element; maximal only rules out larger elements.

What is an upper bound of a set? >> An element above every element of the set.

What is a lower bound of a set? >> An element below every element of the set.

What is a supremum? >> The least upper bound.

What is an infimum? >> The greatest lower bound.

## D. Well-Ordering

What is a well-order? >> A linear order where every nonempty subset has a least element.

What is the well-ordering principle for naturals? >> Every nonempty subset of natural numbers has a least element.

What is the Well-Ordering Theorem? >> Every set can be equipped with some well-order.

How is the Well-Ordering Theorem related to Choice? >> It is equivalent to the Axiom of Choice over ZF.

What proof method does well-ordering support? >> Least-counterexample arguments.

What is a least-counterexample proof? >> Assume a counterexample exists, choose the least one, then derive a contradiction.

What is the difference between well-order and well-founded relation? >> A well-order is linear and every nonempty subset has least element; well-foundedness only rules out infinite descending chains or guarantees minimal elements.

Why are well-orders useful for recursion? >> They support definitions by transfinite or well-founded recursion.

