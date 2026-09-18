# 01 Peano Systems

Canonical RemNote-ready cards for the one-based Peano-system layer.

## A. Structure and primitive data

What is a one-based Peano system? >> A structure $(P,1,S)$ with carrier $P$, first element $1\in P$, successor $S:P\to P$, and Peano axioms.

What are the primitive pieces of data in a one-based Peano system? >> A carrier set $P$, a distinguished element $1$, and a successor map $S:P\to P$.

What does the successor map do? >> It assigns to each $n\in P$ another element $S(n)\in P$.

What does it mean that the Peano system is one-based? >> The distinguished initial element is $1$, not $0$.

What is the intended concrete model of a one-based Peano system? >> The positive natural numbers $\{1,2,3,\dots\}$ with the usual successor.

## B. Peano axioms

State the first-element axiom. >> No element has successor equal to $1$: $\forall n\in P,\ S(n)\ne 1$.

State successor injectivity. >> $\forall m,n\in P,\ S(m)=S(n)\Rightarrow m=n$.

What does successor injectivity forbid? >> Two distinct elements cannot have the same successor.

State induction in subset form. >> If $A\subseteq P$, $1\in A$, and $n\in A\Rightarrow S(n)\in A$, then $A=P$.

What are the two hypotheses in subset induction? >> Base: $1\in A$. Step: $n\in A\Rightarrow S(n)\in A$.

What is the conclusion of subset induction? >> Every element of $P$ lies in $A$, so $A=P$.

State induction in predicate form. >> If $Q(1)$ and $\forall n\in P\,(Q(n)\Rightarrow Q(S(n)))$, then $\forall n\in P\,Q(n)$.

What is the base case in one-based induction? >> Prove the property at $1$.

What is the induction step? >> Assume the property at $n$ and prove it at $S(n)$.

Why is the induction hypothesis local? >> It assumes the property only for the current arbitrary $n$, not automatically for every element.

## C. Immediate structural consequences

What can every element of a one-based Peano system be classified as? >> It is either $1$ or the successor of another element.

What is the predecessor property for noninitial elements? >> If $n\ne1$, then there exists $m\in P$ with $S(m)=n$.

Why is a predecessor unique when it exists? >> Because successor is injective.

Can $1$ have a predecessor in a Peano system? >> No. The first-element axiom rules this out.

Can an element have two different predecessors? >> No. Injectivity of successor makes predecessors unique.

What structural fact rules out a second disconnected successor-chain? >> Induction: any successor-closed subset containing $1$ must equal the whole carrier.

## D. Iteration

What is iteration of the successor map? >> Repeated application of $S$ starting from a chosen element.

What is $S^0(n)$? >> $n$.

What is $S^{k+1}(n)$? >> $S(S^k(n))$.

What does $S^k(1)$ represent? >> The element reached after applying successor $k$ times to $1$.

What is the purpose of an iterator theorem? >> To justify repeated application of an operation by natural-number recursion.

What are the two defining clauses of an iterator? >> Initial value at $1$ and a successor-step rule determining the next value.

What does uniqueness of iteration mean? >> Any two functions satisfying the same initial and successor clauses are equal.

What does existence of iteration mean? >> There is a function satisfying the required initial and successor clauses.

## E. Recursion

What is recursion on a Peano system used for? >> To define functions by giving a base value and a rule for successor inputs.

What data define a recursively specified function $f:P\to X$? >> A base value $f(1)$ and a rule determining $f(S(n))$ from $f(n)$.

What does a recursion theorem guarantee? >> Existence and uniqueness of the function satisfying the base and step clauses.

Why is uniqueness essential in recursive definitions? >> It ensures the recursive clauses determine one function, not several incompatible functions.

What is the difference between induction and recursion? >> Induction proves properties; recursion defines functions.

What is the difference between recursion and iteration? >> Iteration repeatedly applies one fixed operation; recursion may use a general step rule depending on prior values.

## F. Addition as a recursive operation

How is addition naturally introduced on a Peano system? >> Recursively in one argument using the successor structure.

What should the addition base clause express conceptually? >> Adding the first natural gives the next appropriate successor-stage value under the chosen one-based convention.

What should the addition step clause express conceptually? >> Adding a successor is obtained by taking the successor of the previous sum.

Which theorem justifies the existence of recursively defined addition? >> The recursion theorem.

Which theorem justifies uniqueness of recursively defined addition? >> The uniqueness part of the recursion theorem.

Why should arithmetic laws not be treated as primitive unless explicitly axiomatized? >> They should be derived from the recursive definitions and Peano structure.

## G. Multiplication as a recursive operation

How is multiplication naturally introduced after addition? >> Recursively in one argument, with the step clause expressed using addition.

What conceptual dependency should be remembered for multiplication? >> Multiplication depends on addition, while addition depends on successor/recursion.

Why is the dependency order successor → addition → multiplication important? >> It records which operations are primitive and which are constructed.

## H. Induction variants

What is strong induction? >> To prove $Q(n)$, assume $Q(k)$ for all earlier $k$ and derive $Q(n)$.

What is the least-counterexample principle? >> If a property fails somewhere, there is a least element where it fails.

How is strong induction related to ordinary induction on $\mathbb N$? >> They are equivalent principles in the standard natural-number setting.

How is least-counterexample reasoning related to well-ordering? >> It uses the fact that every nonempty subset of $\mathbb N$ has a least element.

Why keep ordinary induction, strong induction, and well-ordering as separate cards? >> They are distinct proof forms even when later shown equivalent.

## I. Order concepts needed for the next module

What three properties define a partial order $\le$? >> Reflexivity, antisymmetry, and transitivity.

What additional property makes a partial order linear? >> Comparability: for all $x,y$, either $x\le y$ or $y\le x$.

What does reflexivity mean? >> $\forall x,\ x\le x$.

What does antisymmetry mean? >> $x\le y$ and $y\le x$ imply $x=y$.

What does transitivity mean? >> $x\le y$ and $y\le z$ imply $x\le z$.

What does comparability mean? >> For any $x,y$, one has $x\le y$ or $y\le x$.

What is a strict order associated with $\le$? >> $x<y$ means $x\le y$ and $x\ne y$.

## J. Dependency checks

What comes before addition in the construction? >> Successor and recursion.

What comes before multiplication? >> Addition.

What comes before well-ordering proofs? >> A defined order on the natural numbers.

What should not be introduced in this Peano module yet? >> Integers, rationals, field axioms, LUB completeness, sequences, or metric concepts.

What is the main learning goal of this module? >> Understand how the natural-number structure grows from first element, successor, induction, and recursion.
