# A Regular Map

Advent of Code, Day 20. Check out the [problem statement](https://adventofcode.com/2018/day/20).

*Note:* the problem description mentions `^N(E|W)N$` as a valid path. This would imply that after branching and going eath and west respectively, both branches could continue north. Allowing this would introduce additional complexity to the problem and make parsing in linear time infeasible. A first parser I wrote would not finish in time on the given input. However, none of the given examples exhibit this feature, and neither does the dataset, so the solution given here will not support it.
