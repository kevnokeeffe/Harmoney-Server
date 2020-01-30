import  User from '../db/models/user-model'
import Account from '../db/models/financial-institution/account'
import moment from 'moment'

export function index(req, res) {
    // find
    Account.find({}, (error, account) => {
        if(error) {
            return res.status(500).json()
        }
        return res.status(200).json({ account : account})
    }).populate('auther', 'fName', 'lName', 'username', 'user')
}

export function create(req, res) {
    // create account
    const id = 10;
    User.findOne({_id:id}, (error,user) => {
        if(error && !user) {
            return res.status(500).json()
        }
        const account = new Account(req.body.account)
        account.author = user._id
        account.dueDate = moment(account.dueDate)
        account.save(error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(201).json()
        })
    })
}

export function update(req, res) {
    // update
    const id = 10
    User.findOne({ _id: id}, (error, user) => {
        if(error) {
            return res.status(500).json()
        }
        if(!user) {
            return res.status(404).json()
        }
        const account = req.body.account
        account.author = user_id
        account.dueDate = moment(account.dueDate)
        Account.findByIdAndUpdate({_id: account._id}, account, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function remove(req, res) {
    // remove
    const id = 5
    Account.findOne({ _id: req.params.id}, (error, task) => {
        if(error){
            return res.status(500).json()
        }
        if(!account){
            return res.status(404).json()
        }
        if(account.author._id.toString() !== id){
            return res.status(403).json({ message: 'Not Allowed do that'})
        }
        Account.deleteOne({_id: req.params.id}, error => {
            if (error){
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function show(req, res) {
    // show
    Account.findOne({ _id: req.params.id}, (error, account) => {
        if(error) {
            return res.status(500).json()
        }
        if(!account) {
            return res.status(404).json()
        }
        return res.status(200).json({account:account})
    })
    return res.status(200).json()
}