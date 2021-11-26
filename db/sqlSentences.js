const sql={
    selectWithoutOwners:"SELECT BIN_TO_UUID(p.id) id,p.name,p.age,p.animal FROM pets p LEFT JOIN owner o ON p.owner_id=o.id WHERE o.id IS null",
    selectWithOwners:"SELECT BIN_TO_UUID(p.id) id,p.name,p.age,p.animal FROM pets p INNER JOIN owner o ON p.owner_id=o.id",
    selectOwners:"SELECT BIN_TO_UUID(o.id) id,o.name FROM owner o",
    selectByOwner:"SELECT BIN_TO_UUID(id) id,name,age,animal FROM pets WHERE owner_id LIKE UUID_TO_BIN(?)",
    insertPet:"INSERT INTO pets(id,name,age,animal,owner_id) VALUES(UUID_TO_BIN(UUID()),?,?,?,null)",
    insertOwner:"INSERT INTO owner(id,name) VALUES(UUID_TO_BIN(UUID()),?)",
    updatePet:"UPDATE pets SET name=?,age=?,animal=? WHERE id LIKE UUID_TO_BIN(?)",
    deletePet:"DELETE FROM pets WHERE id LIKE UUID_TO_BIN(?)",
    adoptPet:"UPDATE pets SET owner_id=UUID_TO_BIN(?) WHERE id LIKE UUID_TO_BIN(?)",
    registerUser:"INSERT INTO users(id,email,password,nickname) VALUES(UUID_TO_BIN(UUID()), ?, ?, ?)",
    authUser:"SELECT nickname,password FROM users WHERE email LIKE ?"
};

module.exports=sql;