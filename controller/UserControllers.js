import userDbs from "..//model/user.json" assert { type: "json" };
export const getUser = (req, res) => {
res.json({ data: userDbs });
};

export const EditUser = (req, res) => {
    const { emai, pwd } = req.body
    const user = userDbs.find((user) => user.Email === emai)
    res.sendStatus(200)
}
