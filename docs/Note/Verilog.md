信号类型：线网类型wire，寄存器类型reg
连续赋值语句（分为显式和隐式）
    连续赋值语句的赋值目标只能是线网类型（wire）
    连续赋值语句不能出现在过程块中
    多个连续赋值语句之间是并行的，与位置顺序无关
行为级建模：
    语句类别：
        - 过程语句：initial，always
        - 赋值语句：过程连续赋值assign，过程赋值=、<=
        - 条件语句：if-else，case、casez、casex
        - 循环语句：forever，repeat
        - 语句块：串行语句块begin-end，并行语句块fork-join
        可综合的：always，begin-end，=，<=，if-else，case，casez，casex（可综合的即为可形成电路的或可编译的）
    always语句块
        从语法描述角度，相对于initial过程块，always语句块的触发状态是一直存在的，只要满足always后面的敏感事件列表，就执行过程块。
        语法格式：
            always @(<敏感事件列表>) 
                语句块
        如：
        always @(a)                     // a发生改变为触发条件
        always @(a or b)                // a或b发生改变为触发条件
        always @(posedge clk)           // clk的上升沿到来为触发条件
        always @(negedge clk)           // clk的下降沿到来为触发条件
        always @(posedge clk or negedge rst)            // clk的上升沿到来或rst的下降沿到来为触发条件
同步：做完一件事后才能做另外一件事
异步：可以同时做多件事