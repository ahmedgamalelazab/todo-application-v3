//? My target is do the crud applications on the todo object

const Todo = require("../model/todo");

const { checkForNull } = require("../utils/checkForNulls");

const TimeFutureCalculator = require("../utils/todoTimeCalc");

module.exports.createTodo = async (req, res, next) => {
  const { Fname, Lname, email, id } = req.userData;

  const { Aname, Aduration, Astart } = req.body;


  const result = await checkForNull(Fname, Lname, email, id,Aname, Aduration, Astart);

  if (result === false) {
    return res.status(401).json({
      success: false,
      data: "invalid request!",
    });
  } else {
    try {
      const [currentDate, futureDate] = TimeFutureCalculator.FutureTime(
        Astart,
        Aduration
      );

      const todo = await Todo.query()
        .insert({
          Aname,
          Aduration,
          Astart: currentDate.toLocaleDateString(),
          Afinish: futureDate.toLocaleDateString(),
          user_id: id,
        })
        .returning("*");

      return res.status(200).json({
        success: true,
        data: {
          Fname,
          Lname,
          email,
          id,
          todo,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        data: "server error!",
      });
    }
  }
};

//! update delete Read todo

//read first

module.exports.getTodo = async (req, res, next) => {
  try {
    const userTodo = await Todo.query().where({
      user_id: req.userData["id"],
    });

    return res.status(200).json({
      success: true,
      data: userTodo,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: "server Crash!",
    });
  }
};

//update
module.exports.updateTodo = async (req, res, next) => {
  const { id } = req.params;

  const { numberSignature, newData } = req.body;

  const result = await checkForNull(numberSignature, newData, id);

  if (result === false) {
    return res.status(401).json({
      success: false,
      data: "invalid request",
    });
  }
  //else
  try {
    switch (numberSignature) {
      case 1:
        // 1 means that  the user wanna update the Activity Name ==> [Aname]
        let [updateActivityName] = await Todo.query()
          .patch({
            Aname: newData,
          })
          .where({
            id: id,
          })
          .returning("*");
        return res.status(201).json({
          success: true,
          data: updateActivityName,
        });
      case 2:
        const [todoData] = await Todo.query().where({
          id: id,
        });

        const [currentDate, futureDate] = TimeFutureCalculator.FutureTime(
          todoData["Astart"],
          newData
        );
        let updateDuration = await Todo.query()
          .patch({
            Aduration: newData,
            Astart: currentDate.toLocaleDateString(),
            Afinish: futureDate.toLocaleDateString(),
          })
          .where({
            id: id,
          })
          .returning("*");
        return res.status(201).json({
          success: true,
          data: updateDuration,
        });

      case 3:
        const [todoDataRaw] = await Todo.query().where({
          id: id,
        });

        const [currentDateV, futureDateV] = TimeFutureCalculator.FutureTime(
          newData,
          todoDataRaw["Aduration"]
        );
        let updateActivityStartTime = await Todo.query()
          .patch({
            Astart: currentDateV.toLocaleDateString(),
            Afinish: futureDateV.toLocaleDateString(),
          })
          .where({
            id: id,
          })
          .returning("*");
        return res.status(201).json({
          success: true,
          data: updateActivityStartTime,
        });

      default:
        return res.status(401).json({
          success: false,
          data: "invalid Request!",
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: "server Crash!",
    });
  }
};

//!delete

//suppose that the user wanna delete only one item

module.exports.deleteOneTodo = async (req, res, next) => {
  const { id } = req.params;

  const result = await checkForNull(id);

  console.log(result);

  if (result === true) {
    try {
      const deleteResult = await Todo.query().deleteById(id).returning('*');
      return res.status(200).json({
        success: true,
        data:deleteResult,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        data: "server Crash!",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      data: "invalid Request!",
    });
  }
};

//delete all user records

module.exports.deleteAllRecords = async (req, res, next) => {
  const { id } = req.userData;

  const result = await checkForNull(id);

  if (result === true) {
    try {
      const deleteResult = await Todo.query().delete().where({
        user_id: id,
      }).returning('*');

      return res.status(200).json({
        success: true,
        data: deleteResult,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        data: "server Crash!",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      data: "invalid Request!",
    });
  }
};
