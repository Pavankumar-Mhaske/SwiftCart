<Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/admin-login" replace />
          }
        />
        <Route
          path="/admin-login"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;