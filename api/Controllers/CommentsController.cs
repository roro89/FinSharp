using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepository _commentsRepo;
        private readonly IStockRepository _stockRepo;
        
        public CommentsController(ICommentRepository commentsRepo,
                                 IStockRepository stockRepo)
        {
            _stockRepo = stockRepo;
            _commentsRepo = commentsRepo;
        }       

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentsRepo.GetAllAsync();
            var commentDto = comments.Select(s=>s.ToCommentDto());

            return Ok(commentDto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var comment = await _commentsRepo.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{stockId}")]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDto comment)
        {
            if (!await _stockRepo.StockExists(stockId))
            {
                return BadRequest("Stock does not exist");
            }

            var commentModel = comment.ToCommentFromCreate(stockId);
            await _commentsRepo.CreateAsync(commentModel);

            return CreatedAtAction(nameof(GetById)
            , new
            {
                id = commentModel.Id
            },
            commentModel.ToCommentDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
        {
            var commentModel = updateDto.ToCommentFromUpdate();
            var comment = await _commentsRepo.UpdateAsync(id, commentModel);

            if (comment == null)
            {
                return NotFound("Comment not found");
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var commentModel = await _commentsRepo.DeleteAsync(id);
            if (commentModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}