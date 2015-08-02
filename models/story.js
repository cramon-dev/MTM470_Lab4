storySchema = mongoose.Schema({
    title: String,
    created_by: String,
    content: String,
    created_at: Date,
    updated_at: Date,
    last_update_by: String,
    finished: Boolean
});
exports.Story = mongoose.model('Story',storySchema);