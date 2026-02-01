default:
	@cat makefile

.PHONY: runBackEnd
runBackEnd:
	@npm run start:dev --prefix ./backend
	
.PHONY: runFrontEnd
runFrontEnd:
	@bash -c "cd frontend && open -a 'Google Chrome' http://localhost:8080 && npm run server"

.PHONY: runApp
runApp:
	make runFrontEnd & make runBackEnd