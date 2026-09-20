# 33 Calculus I

Calc I cards for limits and continuity. These are practical course-facing cards:
graphs, tables, algebraic techniques, one-sided limits, asymptotes, and common
test decisions.

## A. Limit Meaning And Notation

What does `lim_{x→a} f(x) = L` mean? >> As `x` gets close to `a`, the values of `f(x)` get close to `L`.

Does `lim_{x→a} f(x)` depend on the value of `f(a)`? >> No. The limit depends on what happens near `a`, not necessarily at `a`.

Can a limit exist if `f(a)` is undefined? >> Yes. A hole can have a limit if the graph approaches the same value from both sides.

Can `lim_{x→a} f(x)` be different from `f(a)`? >> Yes. The function value at the point can be different from the value the graph approaches.

What is a hole in a graph? >> A missing point where the graph may still approach a definite y-value.

What is a removable discontinuity? >> A discontinuity caused by a hole or incorrect point value that could be fixed by redefining the function at one point.

When does a two-sided limit exist? >> When the left-hand and right-hand limits both exist and are equal.

When does a limit not exist from a graph? >> When the left and right sides approach different values, grow without bound, or oscillate without settling.

What does `DNE` mean in a limit problem? >> The limit does not exist.

What is the first question to ask in a limit problem? >> What is `x` approaching, and what does the function do near that value?

## B. One-Sided Limits

What does `lim_{x→a⁻} f(x)` mean? >> The limit as `x` approaches `a` from the left side, using values less than `a`.

What does `lim_{x→a⁺} f(x)` mean? >> The limit as `x` approaches `a` from the right side, using values greater than `a`.

How do one-sided limits determine a two-sided limit? >> The two-sided limit exists exactly when the left-hand and right-hand limits are equal.

If the left-hand limit is `2` and the right-hand limit is `5`, what is the two-sided limit? >> It does not exist.

If the left-hand limit and right-hand limit both equal `L`, what is the two-sided limit? >> `L`.

How do you read a left-hand limit from a graph? >> Follow the graph toward the x-value from the left and see what y-value it approaches.

How do you read a right-hand limit from a graph? >> Follow the graph toward the x-value from the right and see what y-value it approaches.

Why are one-sided limits important for piecewise functions? >> Different formulas may apply on the left and right sides of the cutoff.

What kind of discontinuity often has different one-sided limits? >> A jump discontinuity.

At an endpoint of a domain, which limit usually matters? >> The one-sided limit from inside the domain.

## C. Limits From Graphs And Tables

How do you estimate a limit from a table? >> Look at function values as `x` approaches the target from both sides.

What should table values do if a limit appears to exist? >> They should approach the same y-value from the left and the right.

What is a warning sign in a table that a limit may not exist? >> Left-side and right-side values approach different numbers.

What does it mean if graph values grow upward without bound near `a`? >> The function may have an infinite limit or vertical asymptote near `a`.

What does oscillation near a point suggest? >> The limit may not exist because the function does not settle toward one value.

How can a filled dot mislead you in a graph limit problem? >> The filled dot shows `f(a)`, but the limit depends on nearby graph behavior.

How can an open circle help with a graph limit problem? >> It often shows the y-value the graph approaches even if the function is not defined there.

What should you compare when reading a two-sided limit from a graph? >> The y-value approached from the left and the y-value approached from the right.

## D. Direct Substitution And Limit Laws

What is direct substitution? >> Plugging the x-value into the function to evaluate the limit.

When does direct substitution usually work? >> For polynomials and continuous functions, and for rational functions whose denominator is not zero at the target.

What does direct substitution giving a real number usually mean? >> That number is the limit, assuming the function is continuous there or the limit laws apply.

What does direct substitution giving `0/0` mean? >> The expression is indeterminate; more work is needed.

What does direct substitution giving a nonzero number over `0` suggest? >> An infinite limit or vertical asymptote may be involved.

What is the sum law for limits? >> The limit of a sum is the sum of the limits, when the individual limits exist.

What is the product law for limits? >> The limit of a product is the product of the limits, when the individual limits exist.

What is the quotient law for limits? >> The limit of a quotient is the quotient of the limits, provided the denominator limit is not zero.

Why does the quotient law require denominator limit not zero? >> Division by zero is not defined and may lead to infinite behavior or no limit.

How do powers work with limits? >> If `f(x) → L`, then powers like `(f(x))^n` usually approach `L^n`.

How do roots work with limits? >> If the root function is defined and continuous at the limiting value, the limit of the root is the root of the limit.

## E. The `0/0` Indeterminate Form

What does `0/0` tell you in a limit problem? >> The expression needs simplification; it does not mean the limit is zero or undefined automatically.

What should you try first for a rational expression with `0/0`? >> Factor and cancel any common factor causing the zero denominator.

Why is canceling allowed in a limit problem after factoring? >> Limits ignore the exact point `x = a`; canceling can reveal the behavior near the point.

What must be true before canceling a factor? >> The factor must be common to numerator and denominator.

What technique helps when the expression contains square roots? >> Rationalize using the conjugate.

What is a conjugate? >> For `A + B`, the conjugate is `A - B`; for `A - B`, the conjugate is `A + B`.

Why rationalize? >> Multiplying by the conjugate can remove radicals and reveal a cancelable factor.

What technique helps with complex fractions? >> Combine terms using a common denominator, then simplify.

What should you do after simplifying a `0/0` expression? >> Try direct substitution again.

If simplification removes the zero denominator, what kind of discontinuity was likely present? >> A removable discontinuity.

## F. Limits At Infinity

What does `lim_{x→∞} f(x)` ask? >> What y-value the function approaches as x grows without bound.

What does `lim_{x→-∞} f(x)` ask? >> What y-value the function approaches as x becomes very large negative.

What is a horizontal asymptote? >> A line `y = L` that the graph approaches as `x → ∞` or `x → -∞`.

For rational functions, what do you compare for limits at infinity? >> The degrees of the numerator and denominator.

If numerator degree is less than denominator degree, what is the horizontal limit? >> `0`.

If numerator degree equals denominator degree, what is the horizontal limit? >> The ratio of leading coefficients.

If numerator degree is greater than denominator degree, what happens? >> There is usually no finite horizontal limit; the function may grow without bound or have a slant/polynomial asymptote.

What algebraic method helps with limits at infinity? >> Divide numerator and denominator by the highest power of `x` in the denominator.

What happens to `1/x` as `x → ∞`? >> It approaches `0`.

What happens to `1/x^n` as `x → ∞` for positive `n`? >> It approaches `0`.

## G. Infinite Limits And Vertical Asymptotes

What does `lim_{x→a} f(x) = ∞` mean informally? >> The function values grow upward without bound as `x` approaches `a`.

What does `lim_{x→a} f(x) = -∞` mean informally? >> The function values decrease without bound as `x` approaches `a`.

Does an infinite limit count as an ordinary finite limit? >> No. It describes unbounded behavior, not approach to a real number.

What is a vertical asymptote? >> A vertical line `x = a` where the function grows without bound near `a`.

How do you find possible vertical asymptotes in a rational function? >> Set the denominator equal to zero after simplifying common factors.

Why check one-sided behavior near a vertical asymptote? >> The function may go to `∞` on one side and `-∞` on the other.

What tool helps determine signs near a vertical asymptote? >> A sign chart or test values on each side.

If one side goes to `∞` and the other goes to `-∞`, what is the two-sided infinite behavior? >> The two-sided finite limit does not exist; the one-sided infinite limits differ.

## H. Special Trig Limits

What is the most important basic trig limit? >> `lim_{x→0} sin(x)/x = 1`.

What is `lim_{x→0} x/sin(x)`? >> `1`, since it is the reciprocal of a quantity approaching `1`.

What is `lim_{x→0} (1 - cos x)/x`? >> `0`.

What is a common technique for trig limits? >> Rewrite the expression to use `sin(x)/x` or known trig identities.

What should you check about angle units in trig limit formulas? >> Standard trig limit formulas assume radians.

How can substitution appear in trig limits? >> If `u → 0`, then `sin(u)/u → 1`.

What is an example of trig-limit substitution? >> `lim_{x→0} sin(3x)/(3x) = 1`.

How do you handle `sin(3x)/x` as `x→0`? >> Rewrite as `3 · sin(3x)/(3x)`, so the limit is `3`.

## I. Squeeze Theorem

What does the Squeeze Theorem say? >> If `g(x) ≤ f(x) ≤ h(x)` and both outside functions approach `L`, then `f(x)` approaches `L`.

When is the Squeeze Theorem useful? >> When a function is trapped between two simpler functions with the same limit.

What is the classic squeeze pattern with sine or cosine? >> Use that `-1 ≤ sin(anything) ≤ 1` or `-1 ≤ cos(anything) ≤ 1`.

Why does `x sin(1/x)` go to `0` as `x→0`? >> It is trapped between `-x` and `x` in absolute size, and both approach `0`.

What is the key phrase for recognizing squeeze problems? >> Bounded oscillation times something that goes to `0`.

What must the two outside functions do in a squeeze problem? >> They must approach the same limit.

## J. Continuity

What does it mean for a function to be continuous at `a`? >> `f(a)` is defined, `lim_{x→a} f(x)` exists, and the limit equals `f(a)`.

What are the three continuity checks at a point? >> Function value exists, limit exists, and value equals limit.

What is a removable discontinuity? >> A hole or incorrect point value that can be fixed by redefining one value.

What is a jump discontinuity? >> Left and right limits exist but are different.

What is an infinite discontinuity? >> The function grows without bound near the point, often with a vertical asymptote.

What is continuity on an interval? >> The function is continuous at every point in the interval, with one-sided continuity at endpoints when needed.

How do you check continuity of a piecewise function at a break point? >> Compare the left-hand limit, right-hand limit, and function value.

How do you solve for a constant to make a piecewise function continuous? >> Set the left-hand expression and right-hand expression equal at the break point, including the defined value if needed.

Why are polynomials continuous everywhere? >> Their limits equal their values at every real number.

Where can rational functions fail to be continuous? >> Where the denominator is zero.

## K. Decision Tree

What is the first step for most algebraic limit problems? >> Try direct substitution.

If direct substitution gives a real number, what should you usually do? >> Use that number as the limit.

If direct substitution gives `0/0`, what should you try? >> Factor and cancel, rationalize, use a common denominator, or use identities.

If the problem is a rational limit at infinity, what should you compare? >> Degrees of numerator and denominator.

If the problem involves a graph, what should you compare? >> Left-hand and right-hand behavior near the x-value.

If the problem involves a table, what should you compare? >> Values approaching from below and above the target x-value.

If the problem is piecewise at a cutoff, what should you compute? >> The left-hand limit, right-hand limit, and function value.

If the denominator approaches zero but the numerator does not, what should you suspect? >> A vertical asymptote or infinite one-sided limit.

If you see a bounded trig function multiplied by something going to zero, what theorem might help? >> The Squeeze Theorem.

What is the final habit after using an algebraic technique? >> Substitute again into the simplified expression to finish the limit.

