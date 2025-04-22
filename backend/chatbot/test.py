from chatbot import generate_response

# Start an infinite loop for continuous conversation
while True:
    try:
        # Take user input
        user_input = input("You: ")
        
        # Generate the chatbot response
        reply = generate_response(user_input)
        
        # Print the chatbot's reply
        print("Echoes Bot:", reply)
        
    except KeyboardInterrupt:
        # Handle manual interruption (Ctrl+C) gracefully
        print("\nConversation ended.")
        break  # Exit the loop when interrupted
