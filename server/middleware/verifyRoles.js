const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!Array.isArray(req?.roles)) return res.status(403).json({ message: 'Access denied: no roles found.' });

        const rolesArray = [...allowedRoles]
        console.log(rolesArray)
        console.log(req.roles)

        const result = req.roles.some(role => allowedRoles.includes(role));

        if (!result) return res.status(403).json({ message: 'Access denied: insufficient permissions.' });

        next()
    }
}

export default verifyRoles;